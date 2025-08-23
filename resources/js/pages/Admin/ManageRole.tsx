import Button from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Heading from '@/components/ui/Heading';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import AppLayout from '@/layouts/AppLayout';
import { Data, Role, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import styles from './ManageRole.module.css';

// const ROLE_RADIO_OPTIONS = [
//     { label: 'Administrator og redigering', value: 'admin' },
//     { label: 'Kun redigering', value: 'redigering' },
//     { label: 'Kun innsyn', value: 'innsyn' },
// ];

const ManageRole = ({ role, roleUsers, otherUsers }: { role: { data: Role }; roleUsers: Data<User>; otherUsers: Data<User> }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleAddUserToRole = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        router.put(route('role.update', { role: role.data.id, user: selectedUser }));
    };

    const handleRemoveUserFromRole = (userId: number) => {
        router.delete(route('role.destroy', { role: role.data.id, user: userId }));
    };

    return (
        <AppLayout>
            <Head title={`Rolle ${role.data.name}`} />
            <Heading level={2} className="mb-large">
                {role.data.name} - administrer brukere i rollen
            </Heading>
            <Table
                headers={[
                    { text: 'Navn', sortable: false },
                    { text: 'E-post', sortable: false },
                    { text: '', sortable: false },
                ]}
            >
                {roleUsers.data.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className={styles.removeLink}>
                            <ButtonLink onClick={() => handleRemoveUserFromRole(user.id)}>Fjern fra rolle</ButtonLink>
                        </td>
                    </tr>
                ))}
            </Table>
            <form className={styles.selectContainer} onSubmit={handleAddUserToRole}>
                <Select onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Velg bruker</option>
                    {otherUsers.data.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
                <Button>Legg til i rollen {role.data.name}</Button>
            </form>
        </AppLayout>
    );
};

export default ManageRole;
