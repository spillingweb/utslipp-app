import styles from "./TilsynForm.module.css";
import Form from "../ui/Form";
import { TilsynObject } from "@/types";
import Select from "../ui/Select";
import Heading from "../ui/Heading";

const TilsynForm = ({data}: {data: TilsynObject}) => {

  return (
    <Form onSubmit={() => console.log("TilsynForm")}>
      <Heading className={styles.heading} level={2}>{`${data.gnr}/${data.bnr}${data.fnr ? `/${data.fnr}` : ''} ${data.adresse}`}</Heading>
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor="zone">Sone</label>
        <Select optionsArray={[{value: '1', text: '1'}, {value: '2', text: '2'}]} id="zone" defaultValue={data.sone} disabled={data.id !== undefined} />
      </fieldset>
    </Form>
  );
};

export default TilsynForm;
