import styles from './radio.module.css';

type RadioProps = {
    label: string;
    name: string;
    value: string | number;
    id: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
};

const Radio = ({ label, name, id, value, onChange, checked = false }: RadioProps) => {
    return (
        <label className={styles.radio} htmlFor={id}>
            <input type="radio" name={name} id={id} value={value} onChange={onChange} defaultChecked={checked} />
            {label}
        </label>
    );
};

export default Radio;
