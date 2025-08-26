import Table from '@/components/ui/Table';
import TextLink from '@/components/ui/TextLink';
import AdminLayout from '@/layouts/AdminLayout';
import { Data, Role } from '@/types';

const RolesTable = ({ roles }: { roles: Data<Role> }) => {
    return (
        <AdminLayout>
            <Table
                headers={[
                    { text: 'Navn', sortable: false },
                    { text: 'Beskrivelse', sortable: false },
                    { text: '', sortable: false },
                ]}
            >
                {roles.data.map((role) => (
                    <tr key={role.name}>
                        <td>{role.name}</td>
                        <td style={{ whiteSpace: 'wrap' }}>{role.description}</td>
                        <td style={{ textAlign: 'right' }}>
                            <TextLink href={route('role.edit', role.id)}>Administrer brukere</TextLink>
                        </td>
                    </tr>
                ))}
            </Table>
        </AdminLayout>
    );
};

export default RolesTable;
