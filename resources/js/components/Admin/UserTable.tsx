import Table from "../ui/Table";
// import styles from "./UserTable.module.css";

const DUMMY_USERS = [
  {
    id: 1,
    firstName: "Per",
    lastName: "Nordmann",
    username: "pernord",
    email: "per@hotmail.com",
    active: true,
    registered: "01.01.2021",
    lastLogin: "01.01.2021",
    groups: ["Admin", "Redigering"],
  },
  {
    id: 2,
    firstName: "Kari",
    lastName: "Nordmann",
    username: "karinord",
    email: "kari@epost.no",
    active: true,
    registered: "01.01.2021",
    lastLogin: "01.01.2021",
    groups: ["Redigering"],
  },
  {
    id: 3,
    firstName: "Ola",
    lastName: "Nordmann",
    username: "olanord",
    email: "ola@epost.no",
    active: false,
    registered: "01.01.2021",
    lastLogin: "01.01.2021",
    groups: ["Redigering"],
  },
  {
    id: 4,
    firstName: "Knut",
    lastName: "Nordmann",
    username: "knutnord",
    email: "knut@yeah.com",
    active: true,
    registered: "01.01.2021",
    lastLogin: "01.01.2021",
    groups: ["Admin"],
  },
];

const UserTable = () => {
  return (
    <Table
      headers={[
        "Fornavn",
        "Etternavn",
        "Brukernavn",
        "E-post",
        "Aktiv",
        "Registrert dato",
        "Sist innlogget",
        "Grupper",
        "",
        "",
        "",
      ]}
    >
      {DUMMY_USERS.map((user) => (
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.active ? "Ja" : "Nei"}</td>
          <td>{user.registered}</td>
          <td>{user.lastLogin}</td>
          <td>{user.groups.join(", ")}</td>
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
