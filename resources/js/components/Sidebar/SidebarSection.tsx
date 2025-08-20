import Heading from '../ui/Heading';
import { SidebarTab } from './Sidebar';
import styles from './SidebarSection.module.css';
import {ChevronLeft} from 'lucide-react';

type SidebarSectionProps = {
    isOpen: boolean;
    title: string;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
    children: React.ReactNode;
};

const SidebarSection = ({ isOpen, title, children, setSidebarTabOpen }: SidebarSectionProps) => {
    let sectionClass = styles.section;

    if (isOpen) {
        sectionClass += ` ${styles.open}`;
    }

    return (
        <section className={sectionClass}>
            <div className={styles.sectionHeader}>
                <Heading className={styles.sectionTitle} level={2}>{title}</Heading>
                <ChevronLeft size={20} className={styles.toggleIcon} onClick={() => {setSidebarTabOpen(null)}} />
            </div>
            <div className={styles.sectionContent}>{children}</div>
        </section>
    );
};

export default SidebarSection;
