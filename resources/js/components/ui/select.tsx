import styles from './Input.module.css';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
    children: React.ReactNode;
}

const Select = ({ children, ...props }: SelectProps) => {
    return (
        <select className={`${styles.input} ${styles.select}`} {...props}>
            {children}
        </select>
    );
};

export default Select;
