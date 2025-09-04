import ButtonLink from '@/components/ui/ButtonLink';
import Table from '@/components/ui/Table';
import TextLink from '@/components/ui/TextLink';
import AdminLayout from '@/layouts/AdminLayout';
import { User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import styles from './AdminTables.module.css';

const UserTable = () => {
    const { users } = usePage<{ users: { data: User[] } }>().props;

    const handleDeleteUser = (user: User) => {
        if (confirm(`Er du sikker på at du vil slette brukeren ${user.name}? Det kan ikke angres.`)) {
            router.delete(route('user.destroy', user.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Table
                headers={[
                    { text: 'Navn', sortable: false },
                    { text: 'E-post', sortable: false },
                    { text: 'Registrert dato', sortable: false },
                    { text: '', sortable: false },
                ]}
            >
                {users.data.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>

                        <td>
                            <div className={styles.actionLinks}>
                                <TextLink href={route('user.edit', user.id)}>Endre</TextLink>
                                <ButtonLink onClick={() => handleDeleteUser(user)}>Slett</ButtonLink>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </AdminLayout>
    );
};

export default UserTable;
