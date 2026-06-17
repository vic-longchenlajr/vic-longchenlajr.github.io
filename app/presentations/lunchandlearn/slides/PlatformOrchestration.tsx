'use client';

import { useEffect, useState } from 'react';
import styles from './slides.module.css';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface PanelItem {
    k: string;
    v: string;
}

// Eight-stage loop: a fast "before" recap (the scatter), then the two structural
// moves — restructure (converge into one model) and encode — revealed in order.
const TOTAL_STAGES = 8;

export default function PlatformOrchestration({ content }: SlideComponentProps) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const duration = stage === TOTAL_STAGES - 1 ? 9000 : stage === 0 ? 800 : 1300;
        const timeout = setTimeout(() => {
            setStage((prev) => (prev + 1) % TOTAL_STAGES);
        }, duration);
        return () => clearTimeout(timeout);
    }, [stage]);

    const isVisible = (s: number) => stage >= s;

    const sources = (content?.sources as string[]) || [
        'Media constraints', 'Pricing', 'Partcodes', 'Agency rules', 'Sizing'
    ];
    const beforeLabel = (content?.beforeLabel as string) || 'The Fragmented Method';
    const beforeCaption = (content?.beforeCaption as string) || 'Logic scattered across 4+ documents. No single source of truth.';
    const afterLabel = (content?.afterLabel as string) || 'The Restructured Method';
    const afterCaption = (content?.afterCaption as string) || 'Consolidate the logic. Restructure the method. Then encode it — once.';
    const modelNode = (content?.modelNode as string) || 'One Canonical Model';
    const encodeNode = (content?.encodeNode as string) || 'Encoded in Software';
    const outputNode = (content?.outputNode as string) || 'Validated Output';
    const manualNode = (content?.manualNode as string) || 'Manual Design';
    const beforeOutputNode = (content?.beforeOutputNode as string) || 'Inconsistent Output';
    const panelTitle = (content?.panelTitle as string) || 'THE STRUCTURAL CHANGE';
    const panelItems = (content?.panelItems as PanelItem[]) || [];
    const panelCaption = (content?.panelCaption as string) || '';

    const beforeActive = stage >= 1 && stage < 3;
    const afterActive = stage >= 3;

    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.modelSplit}>
                {/* TOP ROW: BEFORE — fast recap of the scatter */}
                <div className={`${styles.comparisonRow} ${beforeActive ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>{beforeLabel}</div>
                    <div className={styles.flowCanvas}>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
                                {sources.map((s) => (
                                    <div key={s} className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.nodeVisible : ''}`}>{s}</div>
                                ))}
                            </div>
                            <div className={`${styles.connector} ${isVisible(1) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${isVisible(1) ? styles.nodeVisible : ''} ${beforeActive ? styles.nodeHighlight : ''}`}>{manualNode}</div>
                            <div className={`${styles.connector} ${isVisible(2) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeOutput} ${isVisible(2) ? styles.nodeVisible : ''}`}>{beforeOutputNode}</div>
                        </div>
                    </div>
                    <div className={styles.rowCaption}>&quot;{beforeCaption}&quot;</div>
                </div>

                {/* BOTTOM ROW: AFTER — restructure (1) then encode (2) */}
                <div className={`${styles.comparisonRow} ${afterActive ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>{afterLabel}</div>
                    <div className={styles.flowCanvas}>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence}>
                                {sources.map((s) => (
                                    <div key={s} className={`${styles.node} ${styles.nodeSmall} ${isVisible(3) ? styles.nodeVisible : ''}`}>{s}</div>
                                ))}
                            </div>
                            <div className={`${styles.connector} ${isVisible(4) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeLarge} ${isVisible(4) ? styles.nodeVisible : ''} ${isVisible(4) ? styles.nodeHighlight : ''}`}>
                                <span className={styles.moveTag}>① RESTRUCTURE</span>
                                {modelNode}
                            </div>
                            <div className={`${styles.connector} ${isVisible(5) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeLarge} ${isVisible(5) ? styles.nodeVisible : ''} ${isVisible(5) ? styles.nodeHighlight : ''}`}>
                                <span className={styles.moveTag}>② ENCODE</span>
                                {encodeNode}
                            </div>
                            <div className={`${styles.connector} ${isVisible(6) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeLarge} ${styles.nodeUnified} ${isVisible(6) ? styles.nodeVisible : ''}`}>{outputNode}</div>
                        </div>
                    </div>
                    <div className={styles.rowCaption}>&quot;{afterCaption}&quot;</div>
                </div>
            </div>

            <div className={styles.capabilityPanel}>
                <h3 className={styles.capabilityTitle}>{panelTitle}</h3>
                <ul className={styles.capabilityList}>
                    {panelItems.map((item) => (
                        <li key={item.k}><strong>{item.k}:</strong> {item.v}</li>
                    ))}
                </ul>
                {panelCaption && <p className={styles.capabilityCaption}>{panelCaption}</p>}
            </div>
        </div>
    );
}
