import styles from "./OverlaySection.module.css";

const OverlaySection = ({ children, className }: {children: React.ReactNode, className?: string}) => {
  const classes = className ? `${styles.overlay} ${className}` : styles.overlay;
  
  return <section className={classes}>{children}</section>;
};

export default OverlaySection;
