"""Build the Duc Anh KG brick in Blender and export a production GLB."""

import bpy
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLEND_PATH = ROOT / "assets" / "blender" / "duc-anh-brick.blend"
GLB_PATH = ROOT / "public" / "models" / "duc-anh-brick.glb"
NORMAL_PATH = ROOT / "assets" / "blender" / "textures" / "clay-normal.png"
LOGO_SOURCE_PATH = ROOT / "public" / "brand" / "logo.jpg"
LOGO_MARK_PATH = ROOT / "assets" / "blender" / "textures" / "logo-mark.png"


def make_clay_normal(size: int = 256):
    """Generate a small tileable normal map for fired-clay micro grain."""
    image = bpy.data.images.new("Fired clay micro grain", width=size, height=size, alpha=True)
    pixels = [0.0] * (size * size * 4)
    two_pi = math.tau

    for y in range(size):
        v = y / size
        for x in range(size):
            u = x / size
            dx = (
                0.12 * two_pi * 13 * math.cos(two_pi * (13 * u + 9 * v))
                + 0.055 * two_pi * 31 * math.cos(two_pi * (31 * u - 17 * v))
                + 0.025 * two_pi * 73 * math.cos(two_pi * (73 * u + 61 * v))
            )
            dy = (
                0.12 * two_pi * 9 * math.cos(two_pi * (13 * u + 9 * v))
                - 0.055 * two_pi * 17 * math.cos(two_pi * (31 * u - 17 * v))
                + 0.025 * two_pi * 61 * math.cos(two_pi * (73 * u + 61 * v))
            )
            nx, ny, nz = -dx * 0.014, -dy * 0.014, 1.0
            length = math.sqrt(nx * nx + ny * ny + nz * nz)
            index = (y * size + x) * 4
            pixels[index:index + 4] = [
                nx / length * 0.5 + 0.5,
                ny / length * 0.5 + 0.5,
                nz / length * 0.5 + 0.5,
                1.0,
            ]

    image.pixels.foreach_set(pixels)
    image.colorspace_settings.name = "Non-Color"
    NORMAL_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.filepath_raw = str(NORMAL_PATH)
    image.file_format = "PNG"
    image.save()
    image.pack()
    return image


def material(name: str, color: tuple[float, float, float, float], roughness: float, normal_image=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    principled = mat.node_tree.nodes.get("Principled BSDF")
    principled.inputs["Base Color"].default_value = color
    principled.inputs["Roughness"].default_value = roughness
    principled.inputs["Metallic"].default_value = 0.0
    if normal_image:
        texture = mat.node_tree.nodes.new("ShaderNodeTexImage")
        texture.name = "Fired clay grain"
        texture.image = normal_image
        normal = mat.node_tree.nodes.new("ShaderNodeNormalMap")
        normal.inputs["Strength"].default_value = 0.34
        mat.node_tree.links.new(texture.outputs["Color"], normal.inputs["Color"])
        mat.node_tree.links.new(normal.outputs["Normal"], principled.inputs["Normal"])
    return mat


def make_logo_mark(size: int = 256):
    """Extract the supplied house mark and preserve its edges as transparent alpha."""
    source = bpy.data.images.load(str(LOGO_SOURCE_PATH), check_existing=False)
    source_pixels = list(source.pixels)
    source_width, source_height = source.size
    crop_x, crop_y = 140, 190
    crop_width, crop_height = 200, 200
    image = bpy.data.images.new("Duc Anh KG logo mark", width=size, height=size, alpha=True)
    pixels = [0.0] * (size * size * 4)
    sand_rgb = (0.776, 0.665, 0.485)

    for y in range(size):
        source_y = min(source_height - 1, crop_y + int(y / (size - 1) * (crop_height - 1)))
        for x in range(size):
            source_x = min(source_width - 1, crop_x + int(x / (size - 1) * (crop_width - 1)))
            source_index = (source_y * source_width + source_x) * 4
            r, g, b = source_pixels[source_index:source_index + 3]
            luminance = (r + g + b) / 3.0
            # The source is a JPG, so suppress its compressed burgundy background
            # before feathering the cream mark into a clean decal edge.
            alpha = max(0.0, min(1.0, (luminance - 0.30) / 0.30))
            target_index = (y * size + x) * 4
            pixels[target_index:target_index + 4] = [*sand_rgb, alpha]

    image.pixels.foreach_set(pixels)
    LOGO_MARK_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.filepath_raw = str(LOGO_MARK_PATH)
    image.file_format = "PNG"
    image.save()
    image.pack()
    return image


def logo_decal_material(logo_image):
    mat = bpy.data.materials.new("DAKG Logo Mark")
    mat.use_nodes = True
    mat.surface_render_method = "DITHERED"
    mat.blend_method = "BLEND"
    mat.alpha_threshold = 0.08
    nodes = mat.node_tree.nodes
    principled = nodes.get("Principled BSDF")
    principled.inputs["Roughness"].default_value = 0.82
    texture = nodes.new("ShaderNodeTexImage")
    texture.image = logo_image
    mat.node_tree.links.new(texture.outputs["Color"], principled.inputs["Base Color"])
    mat.node_tree.links.new(texture.outputs["Alpha"], principled.inputs["Alpha"])
    return mat


def rounded_cube(name: str, location, scale, bevel: float, mat=None):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bevel_modifier = obj.modifiers.new(name="Soft masonry edges", type="BEVEL")
    bevel_modifier.width = bevel
    bevel_modifier.segments = 8
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=bevel_modifier.name)
    if mat:
        obj.data.materials.append(mat)
    return obj


def raised_brand_text(body: str, location, mat):
    """Create editable Blender typography, then convert it to a web-safe mesh."""
    bpy.ops.object.text_add(location=location)
    lettering = bpy.context.object
    lettering.name = "DAKG_Raised_Brand"
    lettering.data.body = body
    lettering.data.align_x = "CENTER"
    lettering.data.align_y = "CENTER"
    lettering.data.size = 0.38
    lettering.data.space_character = 1.0
    lettering.data.extrude = 0.010
    lettering.data.bevel_depth = 0.003
    lettering.data.bevel_resolution = 3
    lettering.data.materials.append(mat)

    font_path = ROOT / "public" / "fonts" / "GoogleSansFlex.ttf"
    if font_path.exists():
        lettering.data.font = bpy.data.fonts.load(str(font_path))

    bpy.context.view_layer.objects.active = lettering
    lettering.select_set(True)
    bpy.ops.object.convert(target="MESH")
    lettering.rotation_euler[2] = math.radians(180)
    for polygon in lettering.data.polygons:
        polygon.use_smooth = True
    return lettering


bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

clay_normal = make_clay_normal()
logo_mark = make_logo_mark()
burgundy = material("DAKG Burgundy #591712", (0.100, 0.0086, 0.0060, 1.0), 0.84, clay_normal)
sand = material("DAKG Sand #E4D5B9", (0.776, 0.665, 0.485, 1.0), 0.90, clay_normal)
logo_decal = logo_decal_material(logo_mark)

brick = rounded_cube(
    "DAKG_Brick_Body",
    location=(0.0, 0.0, 0.0),
    scale=(2.30, 1.15, 0.625),
    bevel=0.075,
    mat=burgundy,
)
brick["brand_palette"] = "#591712 / #E4D5B9"
brick["asset_type"] = "architectural brick"

for index, y in enumerate((-0.48, 0.48), start=1):
    cutter = rounded_cube(
        f"Channel_Cutter_{index}",
        location=(0.0, y, 0.61),
        scale=(1.72, 0.20, 0.18),
        bevel=0.10,
    )
    boolean = brick.modifiers.new(name=f"Recessed channel {index}", type="BOOLEAN")
    boolean.operation = "DIFFERENCE"
    boolean.solver = "EXACT"
    boolean.object = cutter
    bpy.context.view_layer.objects.active = brick
    bpy.ops.object.modifier_apply(modifier=boolean.name)
    bpy.data.objects.remove(cutter, do_unlink=True)

    rounded_cube(
        f"DAKG_Sand_Inset_{index}",
        location=(0.0, y, 0.535),
        scale=(1.64, 0.145, 0.035),
        bevel=0.06,
        mat=sand,
    )

# Six true hollow cores pass through the brick, matching common structural clay brick.
for column, y in enumerate((-0.68, 0.0, 0.68), start=1):
    for row, z in enumerate((-0.255, 0.255), start=1):
        cutter = rounded_cube(
            f"Hollow_Core_Cutter_{column}_{row}",
            location=(0.0, y, z),
            scale=(2.46, 0.225, 0.175),
            bevel=0.055,
        )
        hollow = brick.modifiers.new(name=f"Hollow core {column}-{row}", type="BOOLEAN")
        hollow.operation = "DIFFERENCE"
        hollow.solver = "EXACT"
        hollow.object = cutter
        bpy.context.view_layer.objects.active = brick
        bpy.ops.object.modifier_apply(modifier=hollow.name)
        bpy.data.objects.remove(cutter, do_unlink=True)

# Raised horizontal ribs are real geometry on both long faces—not a flat texture.
for side in (-1, 1):
    for rib_index, z in enumerate((-0.46, -0.30, -0.14, 0.14, 0.30, 0.46), start=1):
        rounded_cube(
            f"Side_Rib_{'L' if side < 0 else 'R'}_{rib_index}",
            location=(0.0, side * 1.157, z),
            scale=(2.08, 0.028, 0.026),
            bevel=0.018,
            mat=burgundy,
        )

rounded_cube(
    "DAKG_Underside",
    location=(0.0, 0.0, -0.603),
    scale=(2.12, 0.97, 0.025),
    bevel=0.06,
    mat=sand,
)

# A restrained, genuinely modelled wordmark on the center band.
raised_brand_text("ĐỨC ANH", location=(0.27, 0.0, 0.626), mat=sand)

# The supplied Duc Anh house mark is applied as a clean Blender decal beside the wordmark.
bpy.ops.mesh.primitive_plane_add(size=1.0, location=(-0.72, 0.0, 0.641))
logo = bpy.context.object
logo.name = "DAKG_Logo_Mark"
logo.scale = (0.32, 0.32, 1.0)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
logo.data.materials.append(logo_decal)

for obj in bpy.context.scene.objects:
    if obj.type == "MESH":
        obj.rotation_euler[2] = math.radians(-8)

bpy.context.scene.world.color = (0.02, 0.02, 0.02)
bpy.context.scene.unit_settings.system = "METRIC"
bpy.context.scene.unit_settings.length_unit = "CENTIMETERS"

BLEND_PATH.parent.mkdir(parents=True, exist_ok=True)
GLB_PATH.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))

bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(
    filepath=str(GLB_PATH),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_yup=True,
    export_materials="EXPORT",
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)

print(f"BLEND={BLEND_PATH}")
print(f"GLB={GLB_PATH}")
