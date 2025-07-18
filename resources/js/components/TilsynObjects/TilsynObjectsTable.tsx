import { TilsynObject } from '@/types';
import { router } from '@inertiajs/react';
import TextLink from '../TextLink';
import ButtonLink from '../ui/ButtonLink';
import Table from '../ui/Table';

const TilsynObjectsTable = ({ tilsynObjects }: { tilsynObjects: TilsynObject[] }) => {
    const handleDeleteTilsynsObject = (id: string) => {
        if (confirm(`Er du sikker på at du vil slette tilsynsobjektet? Det kan ikke angres.`)) {
            router.delete(route('tilsyn_object.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Table headers={['Frist', 'Saksbehandler', 'Gnr', 'Bnr', 'Adresse', 'Status', 'Kommentar', '']}>
            {tilsynObjects.map((object) => (
                <tr key={object.id}>
                    <td>{object.frist}</td>
                    <td>{object.saksbeh}</td>
                    <td>{object.gnr}</td>
                    <td>{object.bnr}</td>
                    <td>{object.adresse}</td>
                    <td>{object.status}</td>
                    <td style={{textWrap: 'wrap', minWidth: '15rem'}}>{object.kommentar}</td>
                    <td>
                        <TextLink href={route('tilsyn_object.edit', object.id)}>Endre</TextLink>
                        <ButtonLink style={{ marginLeft: '1rem' }} onClick={() => handleDeleteTilsynsObject(object.id)}>
                            Slett
                        </ButtonLink>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default TilsynObjectsTable;
