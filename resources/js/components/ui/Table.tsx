import { ChevronsUpDown } from 'lucide-react';
import styles from './Table.module.css';

type TableProps = {
    headers: string[];
    sortable: boolean;
    onHeaderClick?: (header: string) => void;
    children: React.ReactNode;
};

const Table = ({ headers, sortable = false, onHeaderClick, children }: TableProps) => {
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {headers.map((header, i) => {
                        // If sortable is true and onHeaderClick is provided, add click handler
                        if (sortable && onHeaderClick && header !== '') {
                            return (
                                <th key={i} onClick={() => onHeaderClick(header)} className={styles.sortable}>
                                    <span>{header}</span>
                                    <ChevronsUpDown size={14} className={styles.sortIcon} />
                                </th>
                            );
                        }
                        
                        // If not sortable, just return the header
                        return <th key={i}>{header}</th>;
                    })}
                </tr>
            </thead>
            <tbody className={styles.tbody}>{children}</tbody>
        </table>
    );
};

export default Table;
