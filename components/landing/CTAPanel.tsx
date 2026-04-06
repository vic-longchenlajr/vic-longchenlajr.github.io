"use client";

interface CTAPanelProps {
  visible?: boolean;
}

export default function CTAPanel({ visible = false }: CTAPanelProps) {
  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
      <div
        className="text-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <h2
          className="font-semibold mb-3"
          style={{ fontSize: 22, color: "#D4D4D4" }}
        >
          Jump in.
        </h2>
        <p className="mb-6" style={{ fontSize: 13, color: "#555" }}>
          Press Ctrl+K anywhere to open
          <br />
          the command palette.
        </p>
        <div className="flex items-center justify-center gap-3">
          <kbd
            className="font-mono rounded-md"
            style={{
              fontSize: 18,
              color: "#666",
              background: "#111",
              border: "1px solid #333",
              borderRadius: 6,
              padding: "6px 14px",
            }}
          >
            Ctrl
          </kbd>
          <kbd
            className="font-mono rounded-md"
            style={{
              fontSize: 18,
              color: "#666",
              background: "#111",
              border: "1px solid #333",
              borderRadius: 6,
              padding: "6px 14px",
            }}
          >
            K
          </kbd>
        </div>
      </div>
    </div>
  );
}
