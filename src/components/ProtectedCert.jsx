import React, { useEffect, useRef } from "react";

/**
 * Draws a certificate onto a <canvas> (instead of an <img>) and bakes a diagonal watermark into it.
 *
 * Why: there is no <img> to "Save image as", the file URL is not exposed in the DOM,
 * and any screenshot / screen-recording of it carries your watermark.
 *
 * NOTE: no website can truly block OS-level screenshots or screen recording. This is a deterrent.
 */
const WATERMARK = "Prathamesh Shelke  •  portfolio preview";

export default function ProtectedCert({ src, alt, blurred = false, className = "", style, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = w;
      canvas.height = h;
      const c = canvas.getContext("2d");
      c.drawImage(img, 0, 0, w, h);

      // tiled diagonal watermark
      const size = Math.max(16, Math.round(w / 36));
      c.save();
      c.translate(w / 2, h / 2);
      c.rotate(-Math.PI / 7);
      c.font = `600 ${size}px Inter, Arial, sans-serif`;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "rgba(20, 30, 50, 0.16)";
      c.strokeStyle = "rgba(255, 255, 255, 0.16)";
      c.lineWidth = Math.max(1, size / 14);
      const stepX = size * 17;
      const stepY = size * 5;
      const span = Math.max(w, h) * 1.3;
      for (let y = -span; y < span; y += stepY) {
        const offset = ((y / stepY) % 2 === 0 ? 0 : stepX / 2);
        for (let x = -span; x < span; x += stepX) {
          c.strokeText(WATERMARK, x + offset, y);
          c.fillText(WATERMARK, x + offset, y);
        }
      }
      c.restore();
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className={`no-select cert-protected transition-[filter] duration-200 ${className}`}
      style={{ filter: blurred ? "blur(28px) brightness(0.6)" : "none", ...style }}
    />
  );
}
