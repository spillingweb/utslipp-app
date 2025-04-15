import styles from './SidebarLink.module.css';

type SidebarLinkProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    icon: React.ReactNode;
};

const SidebarLink = (props: SidebarLinkProps) => {
    return (
        <li>
            <button onClick={props.onClick} className={styles.navLink}>
                {props.icon}
            </button>
        </li>
    );
};

export default SidebarLink;
