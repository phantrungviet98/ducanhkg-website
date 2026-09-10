"""Build the Duc Anh KG brick in Blender and export a production GLB."""

import bpy
import math
from pathlib import Path
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Matrix, Vector


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


def mesh_bounds_xy(obj):
    xs = [vertex.co.x for vertex in obj.data.vertices]
    ys = [vertex.co.y for vertex in obj.data.vertices]
    return min(xs), max(xs), min(ys), max(ys)


def visible_logo_bounds_xy(logo_image, logo_obj, alpha_threshold: float = 0.08):
    """Map the decal's visible alpha bounds onto the logo plane's local geometry."""
    width, height = logo_image.size
    pixels = list(logo_image.pixels)
    visible_x = []
    visible_y = []

    for y in range(height):
        for x in range(width):
            if pixels[(y * width + x) * 4 + 3] > alpha_threshold:
                visible_x.append(x)
                visible_y.append(y)

    if not visible_x:
        raise RuntimeError("Logo decal has no visible pixels")

    plane_min_x, plane_max_x, plane_min_y, plane_max_y = mesh_bounds_xy(logo_obj)
    plane_width = plane_max_x - plane_min_x
    plane_height = plane_max_y - plane_min_y
    u_min = min(visible_x) / width
    u_max = (max(visible_x) + 1) / width
    v_min = min(visible_y) / height
    v_max = (max(visible_y) + 1) / height
    return (
        plane_min_x + u_min * plane_width,
        plane_min_x + u_max * plane_width,
        plane_min_y + v_min * plane_height,
        plane_min_y + v_max * plane_height,
    )


def align_brand_group(logo_obj, text_obj, bars, logo_image, gap: float, angle: float):
    """Align visible logo/text bounds as one group within the bars' shared middle area."""
    logo_min_x, logo_max_x, logo_min_y, logo_max_y = visible_logo_bounds_xy(logo_image, logo_obj)
    text_min_x, text_max_x, text_min_y, text_max_y = mesh_bounds_xy(text_obj)
    bar_bounds = [mesh_bounds_xy(bar) for bar in bars]

    # Use the overlap of both metallic bars, not the brick or object origins.
    available_left = max(bar.location.x + bounds[0] for bar, bounds in zip(bars, bar_bounds))
    available_right = min(bar.location.x + bounds[1] for bar, bounds in zip(bars, bar_bounds))
    available_center_x = (available_left + available_right) * 0.5

    lower_bar, upper_bar = sorted(zip(bars, bar_bounds), key=lambda item: item[0].location.y)
    lower_inner_edge = lower_bar[0].location.y + lower_bar[1][3]
    upper_inner_edge = upper_bar[0].location.y + upper_bar[1][2]
    middle_center_y = (lower_inner_edge + upper_inner_edge) * 0.5

    logo_width = logo_max_x - logo_min_x
    text_width = text_max_x - text_min_x
    group_width = logo_width + gap + text_width
    group_left = available_center_x - group_width * 0.5

    logo_design_x = group_left - logo_min_x
    text_design_x = group_left + logo_width + gap - text_min_x
    logo_design_y = middle_center_y - (logo_min_y + logo_max_y) * 0.5
    text_design_y = middle_center_y - (text_min_y + text_max_y) * 0.5

    cos_angle = math.cos(angle)
    sin_angle = math.sin(angle)

    def rotate_design_position(x, y):
        return x * cos_angle - y * sin_angle, x * sin_angle + y * cos_angle

    logo_obj.location.x, logo_obj.location.y = rotate_design_position(logo_design_x, logo_design_y)
    text_obj.location.x, text_obj.location.y = rotate_design_position(text_design_x, text_design_y)

    measured_center = group_left + group_width * 0.5
    print(
        "BRAND_ALIGNMENT "
        f"available_center={available_center_x:.6f} "
        f"group_center={measured_center:.6f} "
        f"gap={gap:.6f} "
        f"middle_center={middle_center_y:.6f}"
    )


def refine_brand_for_camera(logo_obj, text_obj, logo_image, angle: float):
    """Remove perspective-induced optical offsets without changing any styling."""
    scene = bpy.context.scene
    previous_camera = scene.camera
    previous_resolution = (
        scene.render.resolution_x,
        scene.render.resolution_y,
        scene.render.resolution_percentage,
    )
    bpy.ops.object.camera_add(location=(6.7, -7.2, 5.0))
    camera = bpy.context.object
    camera.name = "DAKG_Alignment_Verification_Camera"
    camera.data.lens = 56
    camera.rotation_euler = (Vector((0.0, 0.0, 0.05)) - camera.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera
    scene.render.resolution_x = 1000
    scene.render.resolution_y = 700
    scene.render.resolution_percentage = 100
    bpy.context.view_layer.update()

    axis_world = Vector((math.cos(angle), math.sin(angle), 0.0))
    perp_world = Vector((-math.sin(angle), math.cos(angle), 0.0))
    origin_world = Vector((0.0, 0.0, 0.641))

    def project(point):
        ndc = world_to_camera_view(scene, camera, point)
        return Vector((ndc.x * scene.render.resolution_x, ndc.y * scene.render.resolution_y))

    origin_2d = project(origin_world)
    axis_2d_vector = project(origin_world + axis_world) - origin_2d
    axis_2d = axis_2d_vector.normalized()
    perp_2d = Vector((-axis_2d.y, axis_2d.x))
    target_gap_pixels = 0.10 * axis_2d_vector.length
    def projected_bounds(points):
        projected = [project(point) for point in points]
        axis_values = [(point - origin_2d).dot(axis_2d) for point in projected]
        perp_values = [(point - origin_2d).dot(perp_2d) for point in projected]
        return min(axis_values), max(axis_values), min(perp_values), max(perp_values)

    def measure():
        text_points = [text_obj.matrix_world @ vertex.co for vertex in text_obj.data.vertices]
        text_bounds = projected_bounds(text_points)
        logo_min_x, logo_max_x, logo_min_y, logo_max_y = visible_logo_bounds_xy(logo_image, logo_obj)
        logo_points = [
            logo_obj.matrix_world @ Vector((x, y, 0.0))
            for x in (logo_min_x, logo_max_x)
            for y in (logo_min_y, logo_max_y)
        ]
        logo_bounds = projected_bounds(logo_points)
        group_axis_center = (
            min(logo_bounds[0], text_bounds[0]) + max(logo_bounds[1], text_bounds[1])
        ) * 0.5
        logo_perp_center = (logo_bounds[2] + logo_bounds[3]) * 0.5
        text_perp_center = (text_bounds[2] + text_bounds[3]) * 0.5
        gap_pixels = text_bounds[0] - logo_bounds[1]
        return group_axis_center, logo_perp_center, text_perp_center, gap_pixels

    def apply_position_delta(delta):
        group_shift, logo_axis_shift, logo_perp_shift, text_perp_shift = delta
        logo_obj.location += axis_world * (group_shift + logo_axis_shift) + perp_world * logo_perp_shift
        text_obj.location += axis_world * group_shift + perp_world * text_perp_shift
        bpy.context.view_layer.update()

    # Solve the camera-space correction from measured finite differences. This
    # accounts for perspective and glyph asymmetry without hand-tuned offsets.
    for _ in range(3):
        group_axis_center, logo_perp_center, text_perp_center, gap_pixels = measure()
        measured = Vector((
            group_axis_center,
            logo_perp_center,
            text_perp_center,
            gap_pixels - target_gap_pixels,
        ))
        if measured.length < 0.05:
            break
        step = 0.001
        columns = []
        for variable_index in range(4):
            perturbation = Vector((0.0, 0.0, 0.0, 0.0))
            perturbation[variable_index] = step
            apply_position_delta(perturbation)
            perturbed_group, perturbed_logo_perp, perturbed_text_perp, perturbed_gap = measure()
            perturbed = Vector((
                perturbed_group,
                perturbed_logo_perp,
                perturbed_text_perp,
                perturbed_gap - target_gap_pixels,
            ))
            apply_position_delta(-perturbation)
            columns.append((perturbed - measured) / step)
        jacobian = Matrix(tuple(columns)).transposed()
        correction = jacobian.inverted() @ -measured
        apply_position_delta(correction)

    group_axis_center, logo_perp_center, text_perp_center, gap_pixels = measure()
    if (
        abs(group_axis_center) > 0.75
        or abs(logo_perp_center - text_perp_center) > 0.75
        or abs(gap_pixels - target_gap_pixels) > 0.75
    ):
        raise RuntimeError("Camera-view brand alignment did not converge")
    print(
        "CAMERA_ALIGNMENT "
        f"group_axis_center_px={group_axis_center:.3f} "
        f"logo_text_perp_delta_px={logo_perp_center - text_perp_center:.3f} "
        f"gap_px={gap_pixels:.3f}"
    )

    scene.camera = previous_camera
    scene.render.resolution_x, scene.render.resolution_y, scene.render.resolution_percentage = previous_resolution
    bpy.data.objects.remove(camera, do_unlink=True)


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

sand_insets = []
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

    sand_insets.append(rounded_cube(
        f"DAKG_Sand_Inset_{index}",
        location=(0.0, y, 0.535),
        scale=(1.64, 0.145, 0.035),
        bevel=0.06,
        mat=sand,
    ))

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
brand_text = raised_brand_text("ĐỨC ANH", location=(0.0, 0.0, 0.626), mat=sand)

# The supplied Duc Anh house mark is applied as a clean Blender decal beside the wordmark.
bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0.0, 0.0, 0.641))
logo = bpy.context.object
logo.name = "DAKG_Logo_Mark"
logo.scale = (0.40, 0.40, 1.0)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
logo.data.materials.append(logo_decal)

brand_angle = math.radians(-8)
align_brand_group(logo, brand_text, sand_insets, logo_mark, gap=0.10, angle=brand_angle)

for obj in bpy.context.scene.objects:
    if obj.type == "MESH":
        obj.rotation_euler[2] = brand_angle

refine_brand_for_camera(logo, brand_text, logo_mark, brand_angle)

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
