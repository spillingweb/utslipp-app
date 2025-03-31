import styles from "./FilterForm.module.css";
import Select from "../UI/Select";
import { FILTER_SELECT_OPTIONS } from "../../lib/filterArrays";

type FilterFormProps = {
  index: number;
};

const FilterForm = ({ index }: FilterFormProps) => {
  return (
    <fieldset id={`filterForm${index}`} className={styles.filterForm}>
      <Select
        name={`filterFelt${index}`}
        id={`filterFelt${index}`}
        optionsArray={FILTER_SELECT_OPTIONS}
      />
      <Select
        name={`filterLogOp${index}`}
        id={`filterLogOp${index}`}
        optionsArray={[
          { value: "=", text: "=" },
          { value: "!=", text: "!=" },
          { value: ">", text: ">" },
          { value: "<", text: "<" },
        ]}
      />
      <Select
        name={`filterVerdi${index}`}
        id={`filterVerdi${index}`}
        optionsArray={FILTER_SELECT_OPTIONS}
      />
    </fieldset>
  );
};

export default FilterForm;
