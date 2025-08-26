import styles from './SidebarLink.module.css';

type SidebarLinkProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isActive: boolean;
    icon: React.ReactNode;
    tabIndex: number;
};

const SidebarLink = ({onClick, isActive, icon, tabIndex}: SidebarLinkProps) => {
    let className = styles.navLink;

    if (isActive) {
        className += ` ${styles.active}`;
    }

    return (
        <li tabIndex={tabIndex}>
            <button onClick={onClick} className={className}>
                {icon}
            </button>
        </li>
    );
};

export default SidebarLink;
