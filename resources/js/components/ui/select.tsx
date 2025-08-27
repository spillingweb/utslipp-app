import styles from './Input.module.css';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
    className?: string;
    ref?: React.Ref<HTMLSelectElement>;
    children: React.ReactNode;
}

const Select = ({ children, className, ref, ...props }: SelectProps) => {
    let classes = `${styles.input} ${styles.select}`;

    if (className) {
        classes += ` ${className}`;
    }

    return (
        <select className={classes} {...props} ref={ref}>
            {children}
        </select>
    );
};

export default Select;
