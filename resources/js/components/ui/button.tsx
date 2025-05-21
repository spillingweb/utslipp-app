import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    variant?: 'primary' | 'secondary' | 'danger' | 'transparent';
}

const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
    let colorClass = styles.btnPrimary;

    if (variant === 'secondary') {
        colorClass = styles.btnSecondary;
    } else if (variant === 'danger') {
        colorClass = styles.btnDanger;
    } else if (variant === 'transparent') {
        colorClass = styles.btnOutline;
    }

    let buttonClasses = `${styles.button} ${colorClass}`;

    if (className) {
        buttonClasses += ` ${className}`;
    }

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
