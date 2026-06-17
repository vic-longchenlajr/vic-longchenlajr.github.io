export type BuiltInLayout =
    | 'hero'
    | 'flow'
    | 'comparison'
    | 'transform'
    | 'grid'
    | 'highlight'
    | 'metrics'
    | 'board'
    | 'demo'
    | 'storyboard'
    | 'intro'
    | 'custom';

export type SlideLayout = BuiltInLayout | string;

export interface PresentationMeta {
    title: string;
    subtitle?: string;
    presenter?: string;
    department?: string;
    date?: string;
    footer?: string;
    theme?: 'dark' | 'light';
    sidebarTitle?: string;
    sidebarSubtitle?: string;
    // When true, every content slide keeps the gradient footer band as a frame
    // but renders no takeaway text (the takeaway fields are ignored for display).
    framedFooter?: boolean;
}

export interface SlideNotes {
    intent: string;
    summary: string;
    bridge?: string;
}

export interface SlideDefinition {
    id: string;
    title: string;
    subtitle?: string;
    breadcrumb: string;
    layout: SlideLayout;
    takeaway?: string | null;
    hideTakeaway?: boolean;
    notes: SlideNotes;
    content?: Record<string, unknown>;
    component?: string;
}

export interface ResolvedSlide extends SlideDefinition {
    renderedContent: React.ReactNode;
}

export type SlideComponentMap = Record<string, React.ComponentType<SlideComponentProps>>;

export interface SlideComponentProps {
    content?: Record<string, unknown>;
    isVisible: boolean;
}

export interface PresentationEngineProps {
    meta: PresentationMeta;
    slides: SlideDefinition[];
    components?: SlideComponentMap;
    hideNavbar?: boolean;
}
