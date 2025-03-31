import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import { type PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({
    children,
    title,
}: PropsWithChildren<{
    name?: string;
    title?: string;
}>) {
    return (
        <div className={styles.authPage}>
            <div>Logo</div>

            <Card>
                {title && <Heading level={2}>{title} </Heading>}
                {children}
            </Card>
        </div>
    );
}
