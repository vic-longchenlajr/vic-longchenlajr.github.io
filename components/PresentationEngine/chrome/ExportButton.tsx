'use client';

import styles from '../PresentationEngine.module.css';

interface ExportButtonProps {
    exporting: boolean;
    progress: { current: number; total: number } | null;
    onExport: () => void;
}

// Unobtrusive bottom-corner control. Shows a static label idle, and a live
// "Exporting… n/total" while a capture is in flight (button disabled).
export const ExportButton = ({ exporting, progress, onExport }: ExportButtonProps) => (
    <button
        type="button"
        className={styles.exportButton}
        onClick={onExport}
        disabled={exporting}
        aria-label="Export presentation to a shareable HTML file"
        title="Export to HTML (E)"
    >
        {exporting
            ? (progress ? `Exporting… ${progress.current}/${progress.total}` : 'Exporting…')
            : '↓ Export'}
    </button>
);
