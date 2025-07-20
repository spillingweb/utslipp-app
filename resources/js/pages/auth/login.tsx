import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/InputError';
import TextLink from '@/components/ui/TextLink';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import FormCard from '@/components/ui/FormCard';
import AuthLayout from '@/layouts/AuthLayout';
import styles from './login.module.css';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Logg inn" />
            <FormCard onSubmit={handleSubmit} logo>
                <fieldset className={styles.loginInput}>
                    <label htmlFor="email">E-postadresse</label>
                    <Input
                        id="email"
                        type="email"
                        aria-required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </fieldset>

                <fieldset className={styles.loginInput}>
                    <div className={styles.flexSpaceBetween}>
                        <label htmlFor="password">Passord</label>

                        <TextLink href={route('password.request')} tabIndex={5}>
                            Glemt passordet?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        aria-required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </fieldset>

                <fieldset>
                    <Input id="remember" type="checkbox" onClick={() => setData('remember', !data.remember)} tabIndex={3} />
                    <label htmlFor="remember">Husk meg</label>
                </fieldset>

                <Button type="submit" tabIndex={4} disabled={processing}>
                    Logg inn
                </Button>
            </FormCard>
        </AuthLayout>
    );
}
