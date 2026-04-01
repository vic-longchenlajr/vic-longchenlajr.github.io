import layoutStyles from './layouts.module.css';

interface ComparisonCard {
    badge: string;
    title: string;
    subtitle: string;
    sections: {
        label: string;
        items: string[];
    }[];
    chips?: string[];
}

interface ComparisonLayoutProps {
    content: Record<string, unknown>;
}

export const ComparisonLayout = ({ content }: ComparisonLayoutProps) => {
    const cards = (content.cards as ComparisonCard[]) || [];

    return (
        <div className={layoutStyles.comparisonContainer}>
            {cards.map((card, i) => (
                <section key={i} className={layoutStyles.comparisonCard}>
                    <div className={layoutStyles.comparisonCardHeader}>
                        <div className={layoutStyles.comparisonBadge}>{card.badge}</div>
                        <h3 className={layoutStyles.comparisonTitle}>{card.title}</h3>
                        <p className={layoutStyles.comparisonSub}>{card.subtitle}</p>
                    </div>
                    <div className={layoutStyles.comparisonSections}>
                        {card.sections.map((section, j) => (
                            <div key={j} className={layoutStyles.comparisonSection}>
                                <div className={layoutStyles.comparisonSectionLabel}>{section.label}</div>
                                <ul className={layoutStyles.comparisonList}>
                                    {section.items.map((item, k) => (
                                        <li key={k}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {card.chips && (
                            <div className={layoutStyles.comparisonSection}>
                                <div className={layoutStyles.comparisonSectionLabel}>Where Friction Appears</div>
                                <div className={layoutStyles.chipGroup}>
                                    {card.chips.map((chip) => (
                                        <span key={chip} className={layoutStyles.chip}>{chip}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};
