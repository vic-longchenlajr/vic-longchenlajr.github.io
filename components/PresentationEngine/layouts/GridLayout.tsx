import layoutStyles from './layouts.module.css';

interface GridTile {
    icon?: string;
    title: string;
    description: string;
}

interface GridLayoutProps {
    content: Record<string, unknown>;
}

export const GridLayout = ({ content }: GridLayoutProps) => {
    const tiles = (content.tiles as GridTile[]) || [];
    const columns = (content.columns as number) || 3;

    return (
        <div
            className={layoutStyles.gridContainer}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(250px, 1fr))` }}
        >
            {tiles.map((tile, i) => (
                <div key={i} className={layoutStyles.gridTile}>
                    {tile.icon && <div className={layoutStyles.gridTileIcon}>{tile.icon}</div>}
                    <h4 className={layoutStyles.gridTileTitle}>{tile.title}</h4>
                    <p className={layoutStyles.gridTileDesc}>{tile.description}</p>
                </div>
            ))}
        </div>
    );
};
