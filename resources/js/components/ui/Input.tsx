import styles from './Input.module.css';

export const Input = ({ type = 'text', className, ...props }: React.ComponentPropsWithoutRef<'input'>) => {
    let classes = styles.input;

    if (type === 'checkbox') {
        classes = styles.checkbox;
    }

    if (className) {
        classes += ` ${className}`;
    }

    return <input type={type} className={classes} {...props} />;
};

export const TextArea = ({ className, ...props }: React.ComponentPropsWithoutRef<'textarea'>) => {
    let classes = styles.input;

    if (className) {
        classes += ` ${className}`;
    }

    return <textarea className={classes} {...props} />;
};
