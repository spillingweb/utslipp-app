import styles from "./radio.module.css";

type RadioProps = {
  label: string;
  name: string;
  value: string;
  id: string;
};

const Radio = ({ label, name, id, value }: RadioProps) => {
  return (
    <label className={styles.radio} htmlFor={id}>
      <input type="radio" name={name} id={id} value={value} />
      {label}
    </label>
  );
};

export default Radio;
