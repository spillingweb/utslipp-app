import styles from "./OverlaySection.module.css";

type OverlaySectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

const OverlaySection = ({ id, className, children }: OverlaySectionProps) => {
  const classes = className ? `${styles.overlay} ${className}` : styles.overlay;

  return <section id={id} className={classes}>{children}</section>;
};

export default OverlaySection;
