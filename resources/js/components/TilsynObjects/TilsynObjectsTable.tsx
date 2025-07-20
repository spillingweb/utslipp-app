import { TilsynObject } from '@/types';
import { router } from '@inertiajs/react';
import ButtonLink from '../ui/ButtonLink';
import Table from '../ui/Table';
import TextLink from '../ui/TextLink';
import styles from './TilsynObjectsTable.module.css';

const TilsynObjectsTable = ({ tilsynObjects }: { tilsynObjects: TilsynObject[] }) => {
    const handleDeleteTilsynsObject = (id: string) => {
        if (confirm(`Er du sikker på at du vil slette tilsynsobjektet? Det kan ikke angres.`)) {
            router.delete(route('tilsyn_object.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className={styles.tableContainer}>
            <Table
                headers={[
                    'Frist',
                    'Saksbehandler',
                    'Sone',
                    'Prosjekt',
                    'Gnr',
                    'Bnr',
                    'Adresse',
                    'Status',
                    'Hjemmel',
                    'Kommentar',
                    'Svarskjema',
                    'KomTek',
                    'Kontroll',
                    'Arkiv',
                    '',
                ]}
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
                        <td className={styles.actions}>
                            <TextLink href={route('tilsyn_object.edit', object.id)}>Endre</TextLink>
                            <ButtonLink style={{ marginLeft: '1rem' }} onClick={() => handleDeleteTilsynsObject(object.id)}>
                                Slett
                            </ButtonLink>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default TilsynObjectsTable;
