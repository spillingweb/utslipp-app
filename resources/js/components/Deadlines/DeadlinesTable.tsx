import Table from "../ui/Table";
import styles from "./DeadlinesTable.module.css";

const DUMMY_PROPERTIES = [
  {
    id: 1,
    frist: "01.01.2021",
    saksbehandler: "Per",
    gnr: 1,
    bnr: 1,
    adresse: "Perveien 1",
    status: "Ikke startet",
    kommentar: "",
  },
  {
    id: 2,
    frist: "01.01.2021",
    saksbehandler: "Per",
    gnr: 1,
    bnr: 1,
    adresse: "Perveien 1",
    status: "Ikke startet",
    kommentar: "",
  },
  {
    id: 3,
    frist: "01.01.2021",
    saksbehandler: "Per",
    gnr: 1,
    bnr: 1,
    adresse: "Perveien 1",
    status: "Ikke startet",
    kommentar: "",
  },
];

const DeadlinesTable = () => {
  return (
    <Table headers={["Frist", "Saksbehandler", "Gnr", "Bnr", "Adresse", "Status", "Kommentar", ""]}>
        {DUMMY_PROPERTIES.map((property) => (
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
