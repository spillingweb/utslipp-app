import styles from './SidebarLink.module.css';

type SidebarLinkProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isActive: boolean;
    icon: React.ReactNode;
    tabIndex: number;
    title: string;
};

const SidebarLink = ({onClick, isActive, icon, tabIndex, title}: SidebarLinkProps) => {
    let className = styles.navLink;

    if (isActive) {
        className += ` ${styles.active}`;
    }

    return (
        <li tabIndex={tabIndex} title={title}>
            <button onClick={onClick} className={className}>
                {icon}
            </button>
        </li>
    );
};

export default SidebarLink;
