import styles from "./Input.module.css";
import { SelectOption } from "../../lib/filterArrays";

type SelectProps = {
  name: string;
  id: string;
  optionsArray: SelectOption[];
};

const Select = ({ name, id, optionsArray }: SelectProps) => {
  return (
    <select className={styles.input} name={name} id={id}>
      {optionsArray.map((option) => {
        let text: string;

        if (!option.text) {
          text = option.value.charAt(0).toUpperCase() + option.value.slice(1);
        } else {
          text = option.text;
        }

        return (
          <option key={option.value} value={option.value}>
            {text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
