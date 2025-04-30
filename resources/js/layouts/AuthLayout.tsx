import { type PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({
    children,
}: PropsWithChildren<{
    title?: string;
}>) {
    return <div className={styles.authPage}>{children}</div>;
}
