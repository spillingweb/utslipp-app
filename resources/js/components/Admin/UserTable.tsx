import { Role, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import ButtonLink from '../ui/ButtonLink';
import Table from '../ui/Table';
import TextLink from '../ui/TextLink';
import styles from './AdminTables.module.css';

const UserTable = ({ roles }: { roles: Role[] }) => {
    const { users } = usePage<{ users: { data: User[] } }>().props;

    const handleDeleteUser = (user: User) => {
        if (confirm(`Er du sikker på at du vil slette brukeren ${user.name}? Det kan ikke angres.`)) {
            router.delete(route('user.destroy', user.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Table
            headers={[
                { text: 'ID', sortable: false },
                { text: 'Navn', sortable: false },
                { text: 'E-post', sortable: false },
                { text: 'Registrert dato', sortable: false },
                { text: 'Verifisert', sortable: false },
                { text: '', sortable: false },
            ]}
        >
            {users.data.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.email_verified_at ? 'Ja' : 'Nei'}</td>
                    <td>
                        <div className={styles.actionLinks}>
                            <TextLink href={route('user.edit', user.id)}>Endre</TextLink>
                            <ButtonLink onClick={() => handleDeleteUser(user)}>Slett</ButtonLink>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default UserTable;
