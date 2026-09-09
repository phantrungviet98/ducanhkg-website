"""Build the Duc Anh KG brick in Blender and export a production GLB."""

import bpy
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLEND_PATH = ROOT / "assets" / "blender" / "duc-anh-brick.blend"
GLB_PATH = ROOT / "public" / "models" / "duc-anh-brick.glb"


def material(name: str, color: tuple[float, float, float, float], roughness: float):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    principled = mat.node_tree.nodes.get("Principled BSDF")
    principled.inputs["Base Color"].default_value = color
    principled.inputs["Roughness"].default_value = roughness
    principled.inputs["Metallic"].default_value = 0.0
    return mat


def rounded_cube(name: str, location, scale, bevel: float, mat=None):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bevel_modifier = obj.modifiers.new(name="Soft masonry edges", type="BEVEL")
    bevel_modifier.width = bevel
    bevel_modifier.segments = 5
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=bevel_modifier.name)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    if mat:
        obj.data.materials.append(mat)
    return obj


bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

burgundy = material("DAKG Burgundy #591712", (0.100, 0.0086, 0.0060, 1.0), 0.76)
sand = material("DAKG Sand #E4D5B9", (0.776, 0.665, 0.485, 1.0), 0.88)

brick = rounded_cube(
    "DAKG_Brick_Body",
    location=(0.0, 0.0, 0.0),
    scale=(2.30, 1.15, 0.625),
    bevel=0.14,
    mat=burgundy,
)
brick["brand_palette"] = "#591712 / #E4D5B9"
brick["asset_type"] = "architectural brick"

for index, y in enumerate((-0.48, 0.48), start=1):
    cutter = rounded_cube(
        f"Channel_Cutter_{index}",
        location=(0.0, y, 0.61),
        scale=(1.72, 0.20, 0.18),
        bevel=0.16,
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
        bevel=0.10,
        mat=sand,
    )

rounded_cube(
    "DAKG_Underside",
    location=(0.0, 0.0, -0.603),
    scale=(2.12, 0.97, 0.025),
    bevel=0.06,
    mat=sand,
)

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
)

print(f"BLEND={BLEND_PATH}")
print(f"GLB={GLB_PATH}")
