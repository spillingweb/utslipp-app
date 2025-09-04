import { CornerDownLeft } from 'lucide-react';
import styles from './ReturnButton.module.css';
import TextLink from './TextLink';

const ReturnButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <div className={styles.returnButton}>
            <CornerDownLeft size={16} />
            <TextLink href={href}>{children}</TextLink>
        </div>
    );
};

export default ReturnButton;
