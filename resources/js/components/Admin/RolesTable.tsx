import { Role } from '@/types';
import TextLink from '../TextLink';
import Table from '../ui/Table';

const RolesTable = ({ roles }: { roles: Role[] }) => {
    return (
        <Table headers={['Navn', 'Beskrivelse', '']}>
            {roles.map((role) => (
                <tr key={role.name}>
                    <td>{role.name}</td>
                    <td style={{ whiteSpace: 'wrap' }}>{role.description}</td>
                    <td style={{ textAlign: 'right' }}>
                        <TextLink href="">Administrer brukere</TextLink>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default RolesTable;
