import { Role } from "@/pages/Admin/Index";
import Table from "../ui/Table";

const AccessGroupTable = ({roles}: {roles: Role[]}) => {

  console.log(roles);
  
  return (
    <Table headers={["Navn", "Beskrivelse", "", "", ""]}>
      {roles.map((role) => (
        <tr key={role.name}>
          <td>{role.name}</td>
          <td>{role.description}</td>
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
