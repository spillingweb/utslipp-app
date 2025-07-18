import styles from './Input.module.css';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
    className?: string;
    children: React.ReactNode;
}

const Select = ({ children, className, ...props }: SelectProps) => {
    let classes = `${styles.input} ${styles.select}`;

    if (className) {
        classes += ` ${className}`;
    }

    return (
        <select className={classes} {...props}>
            {children}
        </select>
    );
};

export default Select;
