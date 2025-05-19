import { TilsynObject } from "@/pages/Deadlines/Index";
import Table from "../ui/Table";
import styles from "./DeadlinesTable.module.css";

const DeadlinesTable = ({tilsynObjects}: {tilsynObjects: TilsynObject[]}) => {

  return (
    <Table headers={["Frist", "Saksbehandler", "Gnr", "Bnr", "Adresse", "Status", "Kommentar", ""]}>
        {tilsynObjects.map((property) => (
          <tr key={property.id}>
            <td>{property.frist}</td>
            <td>{property.saksbehandler}</td>
            <td>{property.gnr}</td>
            <td>{property.bnr}</td>
            <td>{property.adresse}</td>
            <td>{property.status}</td>
            <td>{property.kommentar}</td>
            <td className={styles.buttonCell}>
              <button onClick={() => console.log("Rediger")}>Rediger</button>
            </td>
          </tr>
        ))}
    </Table>
  );
};

export default DeadlinesTable;
