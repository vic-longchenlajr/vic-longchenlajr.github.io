import styles from '../PresentationEngine.module.css';
import type { SlideNotes } from '../types';

interface NotesOverlayProps {
    notes: SlideNotes;
}

export const NotesOverlay = ({ notes }: NotesOverlayProps) => (
    <div className={styles.notesOverlay}>
        <div className={styles.notesTitle}>PRESENTER NOTES</div>
        <div className={styles.notesSection}>
            <strong className={styles.notesLabel}>INTENT:</strong>
            <div className={styles.notesBody}>{notes.intent}</div>
        </div>
        <div className={styles.notesSection}>
            <strong className={styles.notesLabel}>SUMMARY:</strong>
            <div className={styles.notesBody}>{notes.summary}</div>
        </div>
        {notes.bridge && (
            <div className={styles.notesSection}>
                <strong className={styles.notesLabel}>TRANSITION:</strong>
                <div className={styles.notesBridge}>{notes.bridge}</div>
            </div>
        )}
        <div className={styles.notesHint}>Press &apos;N&apos; to close</div>
    </div>
);
