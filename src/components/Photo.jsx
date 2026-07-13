import { useState } from "react";

export default function Photo({ src, alt = "", emoji = "🌿", className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-brwnn-purple/25 via-brwnn-sand to-brwnn-green/25 ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-50">
          <span aria-hidden>{emoji}</span>
        </div>
      )}
    </div>
  );
}
