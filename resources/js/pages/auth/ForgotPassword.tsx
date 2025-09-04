import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import ReturnButton from '@/components/ui/ReturnButton';
import AuthLayout from '@/layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import styles from './auth.module.css';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout status={status}>
            <Head title="Glemt passord" />
            <FormCard onSubmit={submit} heading="Glemt passordet ditt?">
                <fieldset className={styles.loginInput}>
                    <label htmlFor="email">Oppgi e-postadressen din, så får du en lenke for å tilbakestille passordet.</label>
                    <Input id="email" type="email" name="email" autoFocus value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    <InputError message={errors.email} />
                </fieldset>
                <Button disabled={processing}>Send meg en lenke!</Button>
                <ReturnButton href={route('login')}>Tilbake til innlogging</ReturnButton>
            </FormCard>
        </AuthLayout>
    );
}
