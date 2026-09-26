#!/usr/bin/env python3
"""Import a small, web-optimised photo set from the delivered project archives.

The original ZIP files remain untouched. Re-running this script replaces only
the generated files under public/projects.
"""

from __future__ import annotations

import shutil
import subprocess
import tempfile
import unicodedata
import zipfile
from pathlib import Path


SOURCE = Path("/Users/vietphan/Downloads/DucAnhCongtrinh")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "projects"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".heic"}

ARCHIVES = {
    "cong-trinh-anh-chieu": "CÔNG TRÌNH ANH CHIÊU",
    "cong-trinh-anh-phat": "CÔNG TRÌNH ANH PHÁT",
    "cong-trinh-chu-hieu": "CÔNG TRÌNH CHÚ HIẾU",
    "cong-trinh-chu-hoan": "CÔNG TRÌNH CHÚ HOAN",
    "cong-trinh-chu-ho": "CÔNG TRÌNH CHÚ HỔ",
    "cong-trinh-chi-hoa-k4": "CÔNG TRÌNH CHỊ HOA K4",
    "cong-trinh-chi-lien": "CÔNG TRÌNH CHỊ LIÊN",
    "cong-trinh-giuc-tuong": "CÔNG TRÌNH GIỤC TƯỢNG",
    "cong-trinh-go-quao": "CÔNG TRÌNH GÒ QUAO",
    "cong-trinh-le-quy-don": "CÔNG TRÌNH LÊ QUÝ ĐÔN",
    "cong-trinh-lac-hong": "CÔNG TRÌNH LẠC HỒNG",
    "cong-trinh-minh-luong": "CÔNG TRÌNH MINH LƯƠNG",
    "thao-house": "CÔNG TRÌNH THẢO HOUSE",
    "cong-trinh-dien-bien-phu": "CÔNG TRÌNH ĐIỆN BIÊN PHỦ",
    "cua-hang-duc-anh": "CỬA HÀNG ĐỨC ANH",
    "noi-that-phong-ngu": "NỘI THẤT PHÒNG NGỦ",
    "van-phong-duc-anh": "VĂN PHÒNG ĐỨC ANH",
    "cong-trinh-vuon": "ẢNH 3D CÔNG TRÌNH VƯỜN",
}


def plain(value: str) -> str:
    return "".join(
        char for char in unicodedata.normalize("NFD", value).upper()
        if unicodedata.category(char) != "Mn"
    ).replace("Đ", "D")


def candidates(archive: zipfile.ZipFile, contains: str | None = None) -> list[str]:
    result: list[str] = []
    for member in archive.namelist():
        path = Path(member)
        normalized = plain(member)
        if path.suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        if contains and plain(contains) not in normalized:
            continue
        if "COPY" in normalized or "BAN SAO" in normalized:
            continue
        result.append(member)
    if result:
        return result[:3]

    # Some legacy folders contain only files prefixed "Bản sao của".
    return [
        member for member in archive.namelist()
        if Path(member).suffix.lower() in IMAGE_EXTENSIONS
        and (not contains or plain(contains) in plain(member))
    ][:3]


def export_images(zip_path: Path, slug: str, contains: str | None = None) -> None:
    destination = OUTPUT / slug
    destination.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as archive, tempfile.TemporaryDirectory() as tmp:
        selected = candidates(archive, contains)
        for index, member in enumerate(selected, start=1):
            source = Path(tmp) / f"source-{index}{Path(member).suffix.lower()}"
            source.write_bytes(archive.read(member))
            target = destination / f"{index}.jpg"
            subprocess.run(
                ["sips", "-Z", "1800", "-s", "format", "jpeg", "-s", "formatOptions", "78", str(source), "--out", str(target)],
                check=True,
                stdout=subprocess.DEVNULL,
            )
        print(f"{slug}: {len(selected)} photos")


def find_archive(prefix: str) -> Path:
    matches = sorted(SOURCE.glob(f"*/*{prefix}*.zip"))
    if not matches:
        raise FileNotFoundError(prefix)
    return matches[0]


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for slug, prefix in ARCHIVES.items():
        export_images(find_archive(prefix), slug)

    future = find_archive("CÔNG TRÌNH CHƯA THI CÔNG")
    export_images(future, "trinh-house", "TRINH HOUSE")
    export_images(future, "tt-villa", "TT VILLA")
    export_images(future, "nha-pho-2027", "NHA PHO")

    in_progress = find_archive("CÔNG TRÌNH ĐANG THI CÔNG")
    export_images(in_progress, "cong-trinh-xeo-ro", "XEO RO")


if __name__ == "__main__":
    main()
