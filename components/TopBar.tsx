"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function TopBar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <>
      <nav
        id="fs3-topbar"
        className="fixed top-0 left-0 right-0 z-[100] h-12 flex items-center justify-between px-4 transition-opacity duration-300"
        style={{
          background: "#111",
          borderBottom: "1px solid #2A2A2A",
          ...(isLanding ? { opacity: 0, pointerEvents: "none" as const } : {}),
        }}
      >
        {/* ── FS³ mark with hover expand ─────────────────────── */}
        <Link
          href="/"
          className="font-bold select-none relative block"
          style={{ color: "#E87722", textDecoration: "none", height: 24 }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Collapsed: FS³ */}
          <span
            style={{
              fontSize: 17,
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: logoHovered ? 0 : 1,
              filter: logoHovered ? "blur(6px)" : "blur(0)",
              transition: "opacity 0.2s ease, filter 0.25s ease",
              whiteSpace: "nowrap",
            }}
          >
            FS<sup style={{ fontSize: 10, verticalAlign: "super" }}>3</sup>
          </span>

          {/* Expanded: FIRE SUPPRESSION SOFTWARE SUITE */}
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase" as const,
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: logoHovered ? 1 : 0,
              filter: logoHovered ? "blur(0)" : "blur(6px)",
              transition: "opacity 0.3s ease 0.08s, filter 0.3s ease 0.08s",
              whiteSpace: "nowrap",
              color: "#E87722",
            }}
          >
            Fire Suppression Software Suite
          </span>
        </Link>

        {/* ── Search trigger ─────────────────────────────────── */}
        <button
          onClick={openPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors"
          style={{
            background: "#222",
            border: "1px solid #2A2A2A",
            color: "#707070",
            minWidth: 220,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[13px] flex-1 text-left">Jump to tool...</span>
          <span className="flex items-center gap-1">
            <kbd
              className="text-[11px] px-1.5 py-0.5 rounded font-mono"
              style={{
                background: "#111",
                border: "1px solid #333",
                color: "#666",
              }}
            >
              Ctrl
            </kbd>
            <kbd
              className="text-[11px] px-1.5 py-0.5 rounded font-mono"
              style={{
                background: "#111",
                border: "1px solid #333",
                color: "#666",
              }}
            >
              K
            </kbd>
          </span>
        </button>

        {/* Spacer to balance flex layout */}
        <div style={{ width: 40 }} />
      </nav>

      {/* Spacer so page content doesn't sit under the fixed bar */}
      {!isLanding && <div className="h-12" />}
    </>
  );
}
