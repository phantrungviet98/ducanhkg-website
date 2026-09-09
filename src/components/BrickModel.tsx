"use client";

import { Box, Expand } from "lucide-react";
import { createElement, useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";

type BrickModelProps = {
  compact?: boolean;
};

export function BrickModel({ compact = false }: BrickModelProps) {
  const [ready, setReady] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  const label = locale === "vi" ? "Mô hình gạch 3D — kéo để xoay" : "3D brick model — drag to rotate";

  return (
    <div className={`brick-model${compact ? " is-compact" : ""}`}>
      <div className="brick-model-label"><Box size={15} /> BLENDER / GLB</div>
      {ready ? createElement("model-viewer", {
        src: "/models/duc-anh-brick.glb",
        alt: label,
        "camera-controls": true,
        "auto-rotate": true,
        "auto-rotate-delay": 700,
        "rotation-per-second": "12deg",
        ar: true,
        "ar-modes": "webxr scene-viewer quick-look",
        "shadow-intensity": "1.15",
        "shadow-softness": "0.8",
        exposure: "1.05",
        "camera-orbit": "38deg 66deg 6.4m",
        "min-camera-orbit": "auto auto 4.5m",
        "max-camera-orbit": "auto auto 10m",
        "interaction-prompt": "auto",
        "touch-action": "pan-y",
      }) : <div className="brick-model-loading" aria-label={label} />}
      <div className="brick-model-hint"><Expand size={14} /> {locale === "vi" ? "Kéo để xoay · chụm để zoom" : "Drag to rotate · pinch to zoom"}</div>
    </div>
  );
}
