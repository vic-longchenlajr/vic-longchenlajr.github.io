import layoutStyles from './layouts.module.css';

interface BoardColumn {
    title: string;
    items: string[];
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
                    {col.items.map((item, j) => (
                        <div key={j} className={layoutStyles.boardItem}>
                            <div className={layoutStyles.boardItemText}>{item}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
