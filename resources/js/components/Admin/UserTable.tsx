import { User } from '@/pages/Admin/Index';
import { Link, router } from '@inertiajs/react';
import Button from '../ui/Button';
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
                    <td>
                        <Link href={route('user.edit', user.id)}>Endre</Link>
                        <Button onClick={() => handleDeleteUser(user)}>Slett</Button>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default UserTable;
