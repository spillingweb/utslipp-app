import styles from "./Input.module.css";

const Input = ({
  type = "text",
  ...props
}: React.ComponentPropsWithoutRef<"input">) => {
  let className = styles.input;

  if (type === "checkbox") {
    className = styles.checkbox;
  }

  return (
    <input
      type={type}
      className={className}
      {...props}
    />
  );
};

export default Input;
