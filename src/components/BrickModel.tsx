"use client";

import { Box, Expand } from "lucide-react";
import { createElement, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";

type BrickModelProps = {
  compact?: boolean;
};

export function BrickModel({ compact = false }: BrickModelProps) {
  const [ready, setReady] = useState(false);
  const modelRef = useRef<HTMLElement | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  const label = locale === "vi" ? "Mô hình gạch 3D — kéo để xoay" : "3D brick model — drag to rotate";

  useEffect(() => {
    if (!ready || !modelRef.current) return;

    // React 19 treats simple custom-element props as properties. Set the core
    // model-viewer values as attributes so they remain reliable after upgrade.
    modelRef.current.setAttribute("src", "/models/duc-anh-brick.glb");
    modelRef.current.setAttribute("alt", label);
    modelRef.current.setAttribute("ar", "");
    modelRef.current.setAttribute("exposure", "1.12");
  }, [label, ready]);

  return (
    <div className={`brick-model${compact ? " is-compact" : ""}`}>
      <div className="brick-model-label"><Box size={15} /> BLENDER / GLB</div>
      {ready ? createElement("model-viewer", {
        ref: modelRef,
        "camera-controls": true,
        "auto-rotate": true,
        "auto-rotate-delay": 700,
        "rotation-per-second": "12deg",
        "ar-modes": "webxr scene-viewer quick-look",
        "shadow-intensity": "1.15",
        "shadow-softness": "0.65",
        "tone-mapping": "aces",
        "environment-image": "neutral",
        "camera-orbit": "36deg 64deg 9m",
        "camera-target": "0m 0m 0m",
        "interpolation-decay": "120",
        "min-camera-orbit": "auto auto 6.5m",
        "max-camera-orbit": "auto auto 13m",
        "interaction-prompt": "auto",
        "touch-action": "pan-y",
      }) : <div className="brick-model-loading" aria-label={label} />}
      <div className="brick-model-hint"><Expand size={14} /> {locale === "vi" ? "Kéo để xoay · chụm để zoom" : "Drag to rotate · pinch to zoom"}</div>
    </div>
  );
}
