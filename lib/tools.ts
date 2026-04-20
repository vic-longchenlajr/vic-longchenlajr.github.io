export interface Tool {
  name: string;
  description: string;
  version: string;
  status: 'active' | 'beta' | 'alpha' | 'planned';
  category: 'engineering' | 'configuration' | 'resources';
  type: 'internal' | 'external';
  url: string;
  updatedAt: string;
}

export const CATEGORIES = {
  configuration: { label: 'Configuration & Sales', accent: '#85B7EB' },
    engineering: { label: 'Engineering', accent: '#E87722' },

  resources: { label: 'Resources', accent: '#5DCAA5' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const TOOLS: Tool[] = [
  {
    name: "Vortex Project Builder",
    description:
      "Multi-system configuration, real-time pricing & BOM generation",
    version: "v2.2.0",
    status: "active",
    category: "configuration",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/vortex-project-builder/",
    updatedAt: "2026-04-06",
  },
  {
    name: "VicFlex Bracket Filter",
    description: "Bracket selection and compatibility lookup",
    version: "v1.1.0",
    status: "active",
    category: "configuration",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/vicflex-bracket-filter/",
    updatedAt: "2026-03-06",
  },
  {
    name: "LP Resource Dashboard",
    description: "Resource planning and allocation",
    version: "v1.3.0",
    status: "beta",
    category: "engineering",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/resource-dashboard/",
    updatedAt: "2026-04-09",
  },
  {
    name: "VicForge",
    description:
      "Engineering & lab management — projects, timesheets, analytics, part codes",
    version: "v0.3.0",
    status: "alpha",
    category: "engineering",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/vicforge/",
    updatedAt: "2026-04-08",
  },

  {
    name: "Product Request Pipeline",
    description: "Special build order form & packing slip generator for Leland",
    version: "v0.1.0",
    status: "alpha",
    category: "engineering",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/product-request-pipeline/",
    updatedAt: "2026-04-01",
  },
  {
    name: "SprayTrace",
    description: "Deflector iteration tracking & distribution test analysis",
    version: "v0.0.0",
    status: "alpha",
    category: "engineering",
    type: "external",
    url: "https://victaulic-engineering-tech-solutions.github.io/spray-trace/",
    updatedAt: "2026-03-06",
  },

  {
    name: "Presentations",
    description: "AI User Group sessions & engineering case studies",
    version: "",
    status: "active",
    category: "resources",
    type: "internal",
    url: "/presentations",
    updatedAt: "2026-03-12",
  },
  {
    name: "Documentation",
    description: "Standards, best practices & capability summary",
    version: "",
    status: "active",
    category: "resources",
    type: "internal",
    url: "/documentation",
    updatedAt: "2026-03-10",
  },
];
