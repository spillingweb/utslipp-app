import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';
import styles from './TextLink.module.css';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ children, ...props }: LinkProps) {
    return <Link className={styles.textLink} {...props}>{children}</Link>;
}
