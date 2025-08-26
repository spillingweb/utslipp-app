import { SharedData, TilsynObject } from '@/types';
import { router, usePage } from '@inertiajs/react';
import ButtonLink from '../ui/ButtonLink';
import Table from '../ui/Table';
import TextLink from '../ui/TextLink';
import styles from './TilsynObjectsTable.module.css';

type TilsynObjectsTableProps = {
    tilsynObjects: TilsynObject[];
    sortColumn: string;
    setSortColumn: React.Dispatch<React.SetStateAction<string>>;
    setSortDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
    ref: React.RefObject<HTMLTableElement | null>;
};

const TilsynObjectsTable = ({ tilsynObjects, sortColumn, setSortColumn, setSortDirection, ref }: TilsynObjectsTableProps) => {
    const { can } = usePage<SharedData>().props;

    const handleDeleteTilsynsObject = (id: string) => {
        if (confirm(`Er du sikker på at du vil slette tilsynsobjektet? Det kan ikke angres.`)) {
            router.delete(route('tilsyn_object.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    // Handle sorting when a header is clicked, logic in the parent component
    const handleHeaderClick = (header: string) => {
        if (sortColumn === header.toLowerCase()) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        setSortColumn(header.toLowerCase());
    };

    return (
        <div className={styles.tableContainer}>
            <Table
                ref={ref}
                id="tilsynObjectsTable"
                headers={[
                    { text: 'Frist', sortable: true },
                    { text: 'Saksbehandler', sortable: true },
                    { text: 'Sone', sortable: true },
                    { text: 'Prosjekt', sortable: true },
                    { text: 'Gnr', sortable: true },
                    { text: 'Bnr', sortable: true },
                    { text: 'Adresse', sortable: true },
                    { text: 'Status', sortable: true },
                    { text: 'Hjemmel', sortable: true },
                    { text: 'Kommentar', sortable: false },
                    { text: 'Svarskjema', sortable: false },
                    { text: 'KomTek', sortable: false },
                    { text: 'Kontroll', sortable: false },
                    { text: 'Arkiv', sortable: false },
                    { text: '', sortable: false },
                ]}
                onHeaderClick={handleHeaderClick}
            >
                {tilsynObjects.map((object) => (
                    <tr key={object.id}>
                        <td>{object.frist}</td>
                        <td>{object.saksbeh}</td>
                        <td className={styles.center}>{object.sone}</td>
                        <td className={styles.center}>{object.project_id}</td>
                        <td className={styles.center}>{object.gnr}</td>
                        <td className={styles.center}>{object.bnr}</td>
                        <td>{object.adresse}</td>
                        <td className={styles.center}>{object.status}</td>
                        <td className={styles.center}>{object.hjemmel}</td>
                        <td className={styles.wrapText}>{object.kommentar}</td>
                        <td className={styles.wrapText}>{object.svarskjema}</td>
                        <td className={styles.wrapText}>{object.komtek}</td>
                        <td className={styles.wrapText}>{object.kontroll}</td>
                        <td className={styles.wrapText}>{object.arkiv}</td>
                        {can.tilsyn_object_edit && (
                            <td>
                                <div className={styles.actions}>
                                    <TextLink href={route('tilsyn_object.edit', object.id)}>Endre</TextLink>
                                    <ButtonLink onClick={() => handleDeleteTilsynsObject(object.id)}>Slett</ButtonLink>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default TilsynObjectsTable;
