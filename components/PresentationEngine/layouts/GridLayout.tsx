'use client';

import {
    Sheet,
    BrainCircuit,
    Scale,
    RefreshCw,
    Database,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, EASE } from '../motion';
import layoutStyles from './layouts.module.css';

// Map JSON icon names to Lucide components. Add entries here as new slides
// need them; an unknown/absent name simply renders no icon.
const ICONS: Record<string, LucideIcon> = {
    sheet: Sheet,
    brain: BrainCircuit,
    scale: Scale,
    repeat: RefreshCw,
    database: Database,
    workflow: Workflow,
};

interface GridTile {
    icon?: string;
    title: string;
    description: string;
}

interface GridLayoutProps {
    content: Record<string, unknown>;
    isVisible?: boolean;
}

export const GridLayout = ({ content, isVisible = true }: GridLayoutProps) => {
    const tiles = (content.tiles as GridTile[]) || [];
    const columns = (content.columns as number) || 3;
    const callout = content.callout as string | undefined;

    const slam = (content.slam as boolean) || false;
    const reduce = false; // run animations regardless of OS reduced-motion

    // Default: a gentle fade-up cascade. With `slam`, each tile lands hard
    // (scale overshoot) then shimmies to the right and settles.
    const slamVariant = {
        hidden: { opacity: 0, scale: reduce ? 1 : 0.7, x: 0 },
        show: reduce
            ? { opacity: 1, scale: 1, x: 0, transition: { duration: 0.25, ease: EASE } }
            : {
                opacity: [0, 1, 1, 1],
                scale: [0.7, 1.12, 0.97, 1],
                x: [0, 0, 8, 0],
                transition: { duration: 0.7, ease: EASE, times: [0, 0.4, 0.7, 1] },
            },
    };
    const tileItem = slam ? slamVariant : fadeUp(reduce, 22);

    return (
        <motion.div
            className={layoutStyles.gridWrapper}
            variants={staggerContainer(slam ? 0.16 : 0.11, 0.1)}
            initial="hidden"
            animate={isVisible ? 'show' : 'hidden'}
        >
            <div
                className={layoutStyles.gridContainer}
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(250px, 1fr))` }}
            >
                {tiles.map((tile, i) => {
                    const Icon = tile.icon ? ICONS[tile.icon] : undefined;
                    return (
                        <motion.div
                            key={i}
                            className={layoutStyles.gridTile}
                            variants={tileItem}
                            whileHover={reduce ? undefined : { y: -10, transition: { duration: 0.4, ease: EASE } }}
                        >
                            {Icon && (
                                <div className={layoutStyles.gridTileIcon}>
                                    <Icon strokeWidth={2} aria-hidden="true" />
                                </div>
                            )}
                            <h4 className={layoutStyles.gridTileTitle}>{tile.title}</h4>
                            <p className={layoutStyles.gridTileDesc}>{tile.description}</p>
                        </motion.div>
                    );
                })}
            </div>
            {callout && (
                <motion.div className={layoutStyles.gridCallout} variants={tileItem}>
                    <p>{callout}</p>
                </motion.div>
            )}
        </motion.div>
    );
};
