import { User } from '@/types';
import { router } from '@inertiajs/react';
import TextLink from '../TextLink';
import ButtonLink from '../ui/ButtonLink';
import Table from '../ui/Table';

type UserTableProps = {
    users: User[];
};

const UserTable = ({ users }: UserTableProps) => {
    const handleDeleteUser = (user: User) => {
        if (confirm(`Er du sikker på at du vil slette brukeren ${user.name}? Det kan ikke angres.`)) {
            router.delete(route('user.destroy', user.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Table headers={['ID', 'Navn', 'E-post', 'Registrert dato', 'Verifisert', '']}>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.email_verified_at ? 'Ja' : 'Nei'}</td>
                    <td style={{ textAlign: 'right' }}>
                        <TextLink href={route('user.edit', user.id)}>Endre</TextLink>
                        <ButtonLink style={{ marginLeft: '1rem' }} onClick={() => handleDeleteUser(user)}>
                            Slett
                        </ButtonLink>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default UserTable;
