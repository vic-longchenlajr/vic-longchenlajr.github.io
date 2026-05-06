"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { TOOLS, CATEGORIES, type CategoryKey, type Tool } from "@/lib/tools";

/* ── Helpers ───────────────────────────────────────────────────── */
const CATEGORY_ORDER: CategoryKey[] = ["configuration", "engineering", "resources"];

function groupByCategory(tools: Tool[]) {
  const groups: Partial<Record<CategoryKey, Tool[]>> = {};
  for (const t of tools) {
    (groups[t.category] ??= []).push(t);
  }
  return groups;
}

/* ── Component ─────────────────────────────────────────────────── */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | CategoryKey>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveTab("all");
    setOpen(true);
  }, []);

  /* ── Global keyboard listener ─────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustom = () => openPalette();

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustom);
    };
  }, [openPalette]);

  /* ── Focus input when opened ──────────────────────────────── */
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  /* ── Filter tools ─────────────────────────────────────────── */
  const filtered = TOOLS.filter((t) => {
    if (activeTab !== "all" && t.category !== activeTab) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const grouped = groupByCategory(filtered);

  /* ── Navigation helper ────────────────────────────────────── */
  const navigate = useCallback(
    (tool: Tool) => {
      setOpen(false);
      if (tool.type === "external") {
        window.open(tool.url, "_blank", "noopener,noreferrer");
      }
      // internal links handled by <Link>
    },
    []
  );

  if (!open) return null;

  const tabs: { key: "all" | CategoryKey; label: string }[] = [
    { key: "all", label: "All" },
    ...CATEGORY_ORDER.map((k) => ({ key: k, label: CATEGORIES[k].label })),
  ];

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === backdropRef.current) setOpen(false);
      }}
    >
      <div
        className="w-full max-w-[580px] rounded-[10px] border overflow-hidden"
        style={{ background: "var(--bg-raised)", borderColor: "var(--border-strong)" }}
      >
        {/* ── Search row ───────────────────────────────────────── */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "var(--border-strong)" }}
        >
          {/* Search icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E87722"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          <kbd
            className="text-xs px-2 py-0.5 rounded"
            style={{
              color: "var(--text-faint)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-strong)",
            }}
          >
            esc
          </kbd>
        </div>

        {/* ── Category tabs ────────────────────────────────────── */}
        <div
          className="flex gap-1 px-4 py-2 border-b"
          style={{ borderColor: "var(--border-strong)" }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const accent =
              tab.key === "all"
                ? "#E87722"
                : CATEGORIES[tab.key as CategoryKey].accent;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="text-[11px] px-3 py-1 rounded-md font-medium transition-colors"
                style={{
                  color: isActive ? accent : "var(--text-faint)",
                  background: isActive ? `${accent}15` : "transparent",
                  border: `1px solid ${isActive ? accent + "40" : "var(--border-default)"}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Results ──────────────────────────────────────────── */}
        <div
          className="max-h-[50vh] overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border-strong) transparent" }}
        >
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-faint)" }}>
              No tools match your search.
            </div>
          )}

          {CATEGORY_ORDER.map((cat) => {
            const items = grouped[cat];
            if (!items?.length) return null;
            const accent = CATEGORIES[cat].accent;

            return (
              <div key={cat} className="py-2">
                <div
                  className="px-4 py-1 text-[10px] font-bold uppercase tracking-[2px]"
                  style={{ color: accent }}
                >
                  {CATEGORIES[cat].label}
                </div>
                {items.map((tool) => {
                  const inner = (
                    <div
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors group"
                      style={{ borderLeft: "3px solid transparent" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--bg-hover)";
                        e.currentTarget.style.borderLeftColor = accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderLeftColor = "transparent";
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-medium truncate"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {tool.name}
                          </span>
                          <span
                            className="text-[11px] font-mono shrink-0"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {tool.version}
                          </span>
                          {tool.status === "beta" && (
                            <span
                              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                              style={{ color: "#D4A845", background: "#D4A84515" }}
                            >
                              Beta
                            </span>
                          )}
                          {tool.status === "alpha" && (
                            <span
                              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                              style={{ color: "#A78BFA", background: "#A78BFA15" }}
                            >
                              Alpha
                            </span>
                          )}
                        </div>
                        <div
                          className="text-xs truncate mt-0.5"
                          style={{ color: "var(--text-faint)" }}
                        >
                          {tool.description}
                        </div>
                      </div>
                      {tool.type === "external" && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ color: "var(--text-faint)", opacity: 0.6, flexShrink: 0 }}
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                    </div>
                  );

                  if (tool.type === "internal") {
                    return (
                      <Link
                        key={tool.name}
                        href={tool.url}
                        onClick={() => setOpen(false)}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {inner}
                      </Link>
                    );
                  }
                  return (
                    <div
                      key={tool.name}
                      onClick={() => navigate(tool)}
                      role="button"
                      tabIndex={0}
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[11px] border-t"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-strong)", color: "var(--text-faint)" }}
        >
          <div className="flex items-center gap-3">
            <span>
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] mr-1"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-faint)",
                }}
              >
                esc
              </kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
