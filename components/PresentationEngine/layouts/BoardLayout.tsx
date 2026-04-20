import layoutStyles from './layouts.module.css';

interface BoardItemObject {
    title: string;
    description?: string;
}

type BoardItem = string | BoardItemObject;

interface BoardColumn {
    title: string;
    items: BoardItem[];
}

interface BoardLayoutProps {
    content: Record<string, unknown>;
}

export const BoardLayout = ({ content }: BoardLayoutProps) => {
    const columns = (content.columns as BoardColumn[]) || [];

    return (
        <div className={layoutStyles.boardGrid}>
            {columns.map((col, i) => (
                <div key={i} className={layoutStyles.boardColumn}>
                    <h4 className={layoutStyles.boardColumnTitle}>{col.title}</h4>
                    {col.items.map((item, j) => {
                        const isObject = typeof item === 'object' && item !== null;
                        const title = isObject ? (item as BoardItemObject).title : (item as string);
                        const description = isObject ? (item as BoardItemObject).description : undefined;

                        return (
                            <div key={j} className={layoutStyles.boardItem}>
                                <div className={layoutStyles.boardItemText}>{title}</div>
                                {description && (
                                    <div className={layoutStyles.boardItemDesc}>{description}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
