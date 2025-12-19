import LogoBrand from '@/components/ui/LogoBrand';
import AuthLayout from '@/layouts/AuthLayout';
import { Head } from '@inertiajs/react';
import styles from './Auth.module.css';
import Logo from '../../../assets/microsoft_logo.svg';

export default function Login({ status }: { status?: string }) {
    return (
        <AuthLayout status={status} withLogo={false}>
            <Head title="Logg inn" />
            <div className={styles.center}>
                <LogoBrand />
                <a href={route('microsoft.redirect')}>
                    <div className={styles.microsoftLogin}>
                        <img
                            src={Logo}
                            alt="Microsoft Logo"
                            height={20}
                            width={20}
                        />
                        Logg inn
                    </div>
                </a>
            </div>
        </AuthLayout>
    );
}
