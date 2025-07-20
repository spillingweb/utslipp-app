import Button from './Button';
import styles from './Pagination.module.css';

const Pagination = ({
    meta,
    updatedPageNumber,
}: {
    meta: { from: number; to: number; total: number; links: { url: string | null; label: string; active: boolean }[] };
    updatedPageNumber: (link: { url: string | null; label: string; active: boolean }) => void;
}) => {
    return (
        <div className={styles.paginationContainer}>
            <div className={styles.showingResults}>
                Viser {meta.from} til {meta.to} av {meta.total} resultater
            </div>
            <div className={styles.paginationButtons}>
                {meta.links.map((link, index) => (
                    <Button
                        key={index}
                        className={link.active ? styles.active : ''}
                        disabled={link.active || !link.url}
                        onClick={() => {
                            updatedPageNumber(link);
                        }}
                    >
                        {link.label === '&laquo; Previous' ? '«' : link.label === 'Next &raquo;' ? '»' : link.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
