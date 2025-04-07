import Card from '@/components/ui/Card';
import LogoBrand from '@/components/ui/LogoBrand';
import { type PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({
    children,
}: PropsWithChildren<{
    name?: string;
    title?: string;
}>) {
    return (
        <div className={styles.authPage}>
            <Card>
                <LogoBrand />
                {children}
            </Card>
        </div>
    );
}
