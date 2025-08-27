import { use } from 'react';
import Heading from '../ui/Heading';
import styles from './SidebarSection.module.css';
import {ChevronLeft} from 'lucide-react';
import { SidebarContext } from '@/store/sidebar-context';

type SidebarSectionProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
};

const SidebarSection = ({ isOpen, title, children }: SidebarSectionProps) => {
    const { setSidebarTabOpen } = use(SidebarContext);

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
