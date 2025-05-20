import styles from "./Input.module.css";
import { SelectOption } from "../../lib/filterArrays";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  optionsArray: SelectOption[];
};

const Select = ({ optionsArray, ...props }: SelectProps) => {
  return (
    <select className={styles.input} {...props}>
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
