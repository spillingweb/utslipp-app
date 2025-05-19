import styles from './Table.module.css';

type TableProps = {
    headers: string[];
    children: React.ReactNode;
};

const Table = ({ headers, children }: TableProps) => {
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody}>{children}</tbody>
        </table>
    );
};

export default Table;
