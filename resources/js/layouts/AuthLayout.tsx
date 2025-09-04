import { type PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';
import LogoBrand from '@/components/ui/LogoBrand';

export default function AuthLayout({
    children,
}: PropsWithChildren<{
    title?: string;
}>) {
    return (
        <div className={styles.authPage}>
            <LogoBrand />
            {children}
        </div>
    );
}
