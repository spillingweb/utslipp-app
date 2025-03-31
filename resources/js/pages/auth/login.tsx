import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/InputError';
import TextLink from '@/components/TextLink';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthLayout from '@/layouts/AuthLayout';

import styles from './login.module.css';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title='Logg inn'>
            <Head title="Logg inn" />
            <form onSubmit={submit} className={styles.loginForm}>
                <fieldset className={styles.loginInput}>
                    <label htmlFor="email">E-postadresse</label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </fieldset>

                <fieldset className={styles.loginInput}>
                    <div className={styles.flexSpaceBetween}>
                        <label htmlFor="password">Passord</label>
                        {canResetPassword && (
                            <TextLink href={route('password.request')} tabIndex={5}>
                                Glemt passordet?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Passord"
                    />
                    <InputError message={errors.password} />
                </fieldset>

                <fieldset>
                    <Input
                        id="remember"
                        type='checkbox'
                        checked={data.remember}
                        onClick={() => setData('remember', !data.remember)}
                        tabIndex={3}
                    />
                    <label htmlFor="remember">Husk meg</label>
                </fieldset>

                <Button type="submit" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle />}
                    Logg inn
                </Button>

                <div className={styles.flexSpaceBetween}>
                    Har du ingen konto?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Registrer deg
                    </TextLink>
                </div>
            </form>

            {status && <div>{status}</div>}
        </AuthLayout>
    );
}
