import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'transparent';
}

const Button = ({
  variant="primary",
  children,
  ...props
}: ButtonProps) => {
  let colorClass = styles.btnPrimary;

  if (variant === "secondary") {
    colorClass = styles.btnSecondary;
  } else if (variant === "danger") {
    colorClass = styles.btnDanger;
  } else if (variant === "transparent") {
    colorClass = styles.btnOutline;
  }

  const buttonClasses = `${styles.button} ${colorClass}`;

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
