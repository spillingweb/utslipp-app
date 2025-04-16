import styles from './SidebarLink.module.css';

type SidebarLinkProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isActive: boolean;
    icon: React.ReactNode;
};

const SidebarLink = ({onClick, isActive, icon}: SidebarLinkProps) => {
    let className = styles.navLink;

    if (isActive) {
        className += ` ${styles.active}`;
    }

    return (
        <li>
            <button onClick={onClick} className={className}>
                {icon}
            </button>
        </li>
    );
};

export default SidebarLink;
