import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import TextLink from '@/components/ui/TextLink';

import FormCard from '@/components/ui/FormCard';
import AuthLayout from '@/layouts/AuthLayout';
import styles from './auth.module.css';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login({ status }: { status?: string }) {
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
        <AuthLayout status={status}>
            <Head title="Logg inn" />
            <FormCard onSubmit={handleSubmit}>
                <fieldset>
                    <label className="bold" htmlFor="email">
                        E-postadresse
                    </label>
                    <Input
                        id="email"
                        type="email"
                        aria-required
                        autoFocus
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </fieldset>

                <fieldset>
                    <div className={styles.flexSpaceBetween}>
                        <label className="bold" htmlFor="password">
                            Passord
                        </label>

                        <TextLink href={route('password.request')} tabIndex={0}>
                            Glemt passordet?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        aria-required
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </fieldset>

                <div className={styles.rememberMe}>
                    <Input id="remember" type="checkbox" onClick={() => setData('remember', !data.remember)} />
                    <label htmlFor="remember">Husk meg</label>
                </div>

                <Button type="submit" disabled={processing}>
                    Logg inn
                </Button>
            </FormCard>
        </AuthLayout>
    );
}
