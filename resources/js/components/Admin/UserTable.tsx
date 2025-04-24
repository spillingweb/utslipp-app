import { User } from '@/pages/Admin';
import Table from '../ui/Table';
// import styles from "./UserTable.module.css";

const UserTable = ({ users }: { users: User[] }) => {
    console.log(users);
    return (
        <Table headers={['Navn', 'E-post', 'Registrert dato', 'Verifisert', '', '', '']}>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.email_verified_at ? 'Ja' : 'Nei'}</td>
                    <td>
                        <button>Deaktiver</button>
                    </td>
                    <td>
                        <button>Endre</button>
                    </td>
                    <td>
                        <button>Slett</button>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default UserTable;
