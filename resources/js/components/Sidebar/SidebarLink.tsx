import styles from "./SidebarLink.module.css";

type SidebarLinkProps = {
  target: string;
  icon: React.ReactNode;
};

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <li>
      <a href={`#${props.target}`} className={styles.navLink}>
        {props.icon}
      </a>
    </li>
  );
};

export default SidebarLink;
