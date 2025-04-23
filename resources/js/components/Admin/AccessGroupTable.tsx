import { RoleType } from "@/pages/Admin";
import Table from "../ui/Table";

const DUMMY_ACCESS_GROUPS = [
  {
    name: "Admin",
    description: "Administratorer",
    users: 2,
  },
  {
    name: "Redigering",
    description: "Redigeringsrettigheter",
    users: 3,
  },
  {
    name: "Leser",
    description: "Leserettigheter",
    users: 4,
  },
];

const AccessGroupTable = ({roles}: {roles: RoleType[]}) => {

  console.log(roles);
  
  return (
    <Table headers={["Navn", "Beskrivelse", "Antall brukere", "", "", ""]}>
      {DUMMY_ACCESS_GROUPS.map((group) => (
        <tr key={group.name}>
          <td>{group.name}</td>
          <td>{group.description}</td>
          <td>{group.users}</td>
          <td>
            <button>Administrer brukere</button>
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

export default AccessGroupTable;
