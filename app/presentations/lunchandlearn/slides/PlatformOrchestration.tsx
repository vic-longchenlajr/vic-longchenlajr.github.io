'use client';

import { useEffect, useState, Fragment } from 'react';
import styles from './slides.module.css';
import type { SlideComponentProps } from '@/components/PresentationEngine';

export default function PlatformOrchestration(_props: SlideComponentProps) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const duration = stage === 4 ? 3000 : stage === 10 ? 12000 : 1500;
        const timeout = setTimeout(() => {
            setStage((prev) => (prev + 1) % 11);
        }, duration);
        return () => clearTimeout(timeout);
    }, [stage]);

    const isVisible = (s: number) => stage >= s;
    const isAfterActive = stage >= 5;

    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.modelSplit}>
                {/* TOP ROW: BEFORE */}
                <div className={`${styles.comparisonRow} ${stage >= 1 && stage < 5 ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>Independent System Calculations</div>
                    <div className={styles.flowCanvas}>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence} style={{ flexDirection: 'row', gap: '4px' }}>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.nodeVisible : ''}`}>Zone A</div>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.nodeVisible : ''}`}>Zone B</div>
                            </div>
                            <div className={`${styles.connector} ${isVisible(2) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${isVisible(2) ? styles.nodeVisible : ''} ${isVisible(2) && !isAfterActive ? styles.nodeHighlight : ''}`}>System 1</div>
                            <div className={`${styles.connector} ${isVisible(3) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeOutput} ${isVisible(3) ? styles.nodeVisible : ''}`}>Output 1</div>
                        </div>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence} style={{ flexDirection: 'row', gap: '4px' }}>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.nodeVisible : ''}`}>Zone C</div>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.nodeVisible : ''}`}>Zone D</div>
                            </div>
                            <div className={`${styles.connector} ${isVisible(2) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${isVisible(2) ? styles.nodeVisible : ''} ${isVisible(2) && !isAfterActive ? styles.nodeHighlight : ''}`}>System 2</div>
                            <div className={`${styles.connector} ${isVisible(3) ? styles.connectorVisible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeOutput} ${isVisible(3) ? styles.nodeVisible : ''}`}>Output 2</div>
                        </div>
                    </div>
                    <div className={styles.rowCaption}>&quot;Multiple system-level outputs. Manual project reconciliation.&quot;</div>
                </div>

                {/* BOTTOM ROW: AFTER */}
                <div className={`${styles.comparisonRow} ${stage >= 5 ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>Project-Level Hierarchy</div>
                    <div className={styles.hierarchyGrid}>
                        {['A', 'B', 'C', 'D'].map((zoneChar, i) => {
                            const row = i + 1;
                            const enc1 = String.fromCharCode(65 + i * 2);
                            const enc2 = String.fromCharCode(65 + i * 2 + 1);

                            return (
                                <Fragment key={zoneChar}>
                                    <div className={styles.gridCell} style={{ gridColumn: 1, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(5) ? styles.nodeVisible : ''}`}>
                                            Enc {enc1}
                                        </div>
                                    </div>
                                    <div className={styles.gridCell} style={{ gridColumn: 3, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(5) ? styles.nodeVisible : ''}`}>
                                            Enc {enc2}
                                        </div>
                                    </div>
                                    <div className={`${styles.gridConnector} ${isVisible(6) ? styles.connectorVisible : ''}`} style={{ gridColumn: 4, gridRow: row }}>→</div>
                                    <div className={styles.gridCell} style={{ gridColumn: 5, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(6) ? styles.nodeVisible : ''}`}>
                                            Zone {zoneChar}
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}

                        <div className={`${styles.gridConnector} ${isVisible(7) ? styles.connectorVisible : ''}`} style={{ gridColumn: 6, gridRow: '1 / span 2' }}>→</div>
                        <div className={`${styles.systemNodeGroup} ${isVisible(7) ? styles.nodeHighlight : ''}`} style={{ gridRow: '1 / span 2' }}>
                            <div className={`${styles.node} ${isVisible(7) ? styles.nodeVisible : ''}`}>System 1</div>
                        </div>

                        <div className={`${styles.gridConnector} ${isVisible(7) ? styles.connectorVisible : ''}`} style={{ gridColumn: 6, gridRow: '3 / span 2' }}>→</div>
                        <div className={`${styles.systemNodeGroup} ${isVisible(7) ? styles.nodeHighlight : ''}`} style={{ gridRow: '3 / span 2' }}>
                            <div className={`${styles.node} ${isVisible(7) ? styles.nodeVisible : ''}`}>System 2</div>
                        </div>

                        <div className={`${styles.gridConnector} ${isVisible(8) ? styles.connectorVisible : ''}`} style={{ gridColumn: 8, gridRow: '1 / span 4' }}>→</div>
                        <div className={styles.projectNodeGroup}>
                            <div className={`${styles.node} ${styles.nodeLarge} ${isVisible(8) ? styles.nodeVisible : ''} ${isVisible(8) ? styles.nodeHighlight : ''}`}>PROJECT</div>
                        </div>

                        <div className={`${styles.gridConnector} ${isVisible(9) ? styles.connectorVisible : ''}`} style={{ gridColumn: 10, gridRow: '1 / span 4' }}>→</div>
                        <div className={styles.outputNodeGroup}>
                            <div className={`${styles.node} ${styles.nodeLarge} ${styles.nodeUnified} ${isVisible(9) ? styles.nodeVisible : ''}`}>UNIFIED OUTPUT</div>
                        </div>
                    </div>
                    <div className={styles.rowCaption}>&quot;&quot;</div>
                </div>
            </div>

            <div className={styles.capabilityPanel}>
                <h3 className={styles.capabilityTitle}>PLATFORM ORCHESTRATION</h3>
                <ul className={styles.capabilityList}>
                    <li><strong>Model:</strong> enclosure → zone → system → project modeling</li>
                    <li><strong>Validate:</strong> cross-system validation logic</li>
                    <li><strong>Aggregate:</strong> centralized BOM aggregation</li>
                    <li><strong>Standardize:</strong> project-level documentation</li>
                    <li><strong>Guide:</strong> warnings, tutorials, error codes</li>
                </ul>
                <p className={styles.capabilityCaption}>Scaling from system validation to project-wide coordination.</p>
            </div>
        </div>
    );
}
