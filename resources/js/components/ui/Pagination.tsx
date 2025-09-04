import Button from './Button';
import styles from './Pagination.module.css';

const Pagination = ({
    meta,
    updatePageNumber,
}: {
    meta: { from: number; to: number; total: number; links: { url: string | null; label: string; active: boolean }[] };
    updatePageNumber: (link: { url: string | null; label: string; active: boolean }) => void;
}) => {
    return (
        <div className={styles.paginationContainer}>
            <div className={styles.showingResults}>
                Viser {meta.from || 0} til {meta.to} av {meta.total} resultater
            </div>
            <div className={styles.paginationButtons}>
                {meta.links.map((link, index) => (
                    <Button
                        key={index}
                        className={link.active ? styles.active : ''}
                        disabled={link.active || !link.url}
                        onClick={() => {
                            updatePageNumber(link);
                        }}
                    >
                        {link.label === 'pagination.previous' ? '«' : link.label === 'pagination.next' ? '»' : link.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
