import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import AppLayout from '@/layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
    const { data, setData, put, processing, errors } = useForm<{
        current_password: string;
        password: string;
        password_confirmation: string;
    }>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('password.update'));
    };

    return (
        <AppLayout>
            <Head title="Endre passord" />
            <FormCard onSubmit={onSubmit} heading="Endre passord">
                <fieldset>
                    <label className='bold' htmlFor="current_password">Nåværende passord</label>
                    <Input
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                    />
                    <InputError message={errors.current_password} />
                </fieldset>
                <fieldset>
                    <label className='bold' htmlFor="password">Nytt passord</label>
                    <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                    <InputError message={errors.password} />
                </fieldset>
                <fieldset>
                    <label className='bold' htmlFor="password_confirmation">Bekreft nytt passord</label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} />
                </fieldset>
                <div className={styles.cta}>
                    <Button type="submit" disabled={processing}>
                        Lagre nytt passord
                    </Button>
                    <Button type='button' variant='secondary' onClick={() => router.get(route('profile.edit'))}>Avbryt</Button>
                </div>
            </FormCard>
        </AppLayout>
    );
};

export default ChangePassword;
