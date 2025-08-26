import { Check, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Flash.module.css';

const Flash = ({
    message,
}: {
    message: {
        success: string | undefined;
        error: string | undefined;
    };
}) => {
    const [flashVisible, setFlashVisible] = useState(true);

    useEffect(() => {
        setFlashVisible(true);
        const timer = setTimeout(() => {
            setFlashVisible(false);
        }, 3000); // Hide flash after 3 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [message]);

    if (!message.success && !message.error) {
        return null;
    }

    const flashClass = `${styles.flash} ${flashVisible ? styles.visible : ''}`;
    const flashIconClass = message.success ? styles.success : styles.error;
    const icon = message.success ? <Check className={styles.icon} /> : <CircleX className={styles.icon} />;
    const messageText = message.success || message.error || '';

    return (
        <div className={flashClass}>
            <div className={`${styles.flashIcon} ${flashIconClass}`}>{icon}</div>
            <p>{messageText}</p>
        </div>
    );
};

export default Flash;
