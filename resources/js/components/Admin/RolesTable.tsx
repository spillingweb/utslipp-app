import { Role } from '@/types';
import Table from '../ui/Table';
import TextLink from '../ui/TextLink';

const RolesTable = ({ roles }: { roles: Role[] }) => {
    return (
        <Table
            headers={[
                { text: 'Navn', sortable: false },
                { text: 'Beskrivelse', sortable: false },
                { text: '', sortable: false },
            ]}
        >
            {roles.map((role) => (
                <tr key={role.name}>
                    <td>{role.name}</td>
                    <td style={{ whiteSpace: 'wrap' }}>{role.description}</td>
                    <td style={{ textAlign: 'right' }}>
                        <TextLink href={route('role.edit', role.id)}>Administrer brukere</TextLink>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default RolesTable;
