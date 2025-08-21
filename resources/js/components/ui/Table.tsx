import { ChevronsUpDown } from 'lucide-react';
import styles from './Table.module.css';

type TableProps = {
    headers: { text: string; sortable: boolean }[];
    id?: string;
    ref?: React.RefObject<HTMLTableElement | null>;
    onHeaderClick?: (header: string) => void;
    children: React.ReactNode;
};

const Table = ({ headers, id, ref, onHeaderClick, children }: TableProps) => {
    return (
        <table className={styles.table} id={id} ref={ref}>
            <thead className={styles.thead}>
                <tr>
                    {headers.map((header, i) => {
                        // If sortable is true and onHeaderClick is provided, add click handler
                        if (header.sortable && onHeaderClick) {
                            return (
                                <th key={i} onClick={() => onHeaderClick(header.text)} className={styles.sortable}>
                                    <div>
                                        {header.text}
                                        <ChevronsUpDown size={14} className={styles.sortIcon} />
                                    </div>
                                </th>
                            );
                        }

                        // If not sortable, just return the header
                        return <th key={i}>{header.text}</th>;
                    })}
                </tr>
            </thead>
            <tbody className={styles.tbody}>{children}</tbody>
        </table>
    );
};

export default Table;
