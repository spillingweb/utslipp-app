import Heading from '../ui/Heading';
import styles from './SidebarSection.module.css';
import {ChevronLeft} from 'lucide-react';

type SidebarSectionProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
};

const SidebarSection = ({ isOpen, title, children }: SidebarSectionProps) => {
    let sectionClass = styles.section;

    if (isOpen) {
        sectionClass += ` ${styles.open}`;
    }

    return (
        <section className={sectionClass}>
            <div className={styles.sectionHeader}>
                <Heading className={styles.sectionTitle} level={2}>{title}</Heading>
                <ChevronLeft size={20} className={styles.toggleIcon} onClick={() => {}} />
            </div>
            <div className={styles.sectionContent}>{children}</div>
        </section>
    );
};

export default SidebarSection;
