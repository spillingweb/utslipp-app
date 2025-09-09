import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import ReturnButton from '@/components/ui/ReturnButton';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import { Data, Role, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import styles from './ManageRole.module.css';
import AdminLayout from '@/layouts/AdminLayout';

const ManageRole = ({ role, roleUsers, otherUsers }: { role: { data: Role }; roleUsers: Data<User>; otherUsers: Data<User> }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleAddUserToRole = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        router.put(route('admin.role.update', { role: role.data.id, user: selectedUser }));
    };

    return (
        <AdminLayout>
            <Head title={`Rolle ${role.data.name}`} />
            <Heading level={2} className="mb-medium">
                {role.data.name} - administrer brukere
            </Heading>
            <div className={styles.back}>
                <ReturnButton href={route('admin.roles')}>Tilbake til roller</ReturnButton>
            </div>
            <div className={styles.flexContainer}>
                <Table
                    headers={[
                        { text: 'Navn', sortable: false },
                        { text: 'E-post', sortable: false },
                    ]}
                >
                    {roleUsers.data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </Table>
                <form className={styles.selectContainer} onSubmit={handleAddUserToRole}>
                    <Select onChange={(e) => setSelectedUser(e.target.value)} required>
                        <option value="">Velg bruker</option>
                        {otherUsers.data.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                    <Button>Legg til i rollen {role.data.name}</Button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ManageRole;
