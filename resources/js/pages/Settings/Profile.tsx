import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import TextLink from '@/components/ui/TextLink';
import AppLayout from '@/layouts/AppLayout';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import styles from './Profile.module.css';

const Profile = ({ role }: { role: string }) => {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, patch, processing, errors } = useForm<{
        name: string;
        email: string;
        current_password: string;
        password: string;
        password_confirmation: string;
    }>({
        name: auth.user.name || '',
        email: auth.user.email || '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update', auth.user.id));
    };

    return (
        <AppLayout>
            <Head title="Profil" />
            <FormCard onSubmit={onSubmit} heading="Profil">
                <p className={styles.role}>
                    Du har rollen <span>{role}</span>. For å endre rolle, ta kontakt med systemansvarlig.
                </p>
                <fieldset className={styles.input}>
                    <label htmlFor="name">Navn</label>
                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </fieldset>
                <fieldset className={styles.input}>
                    <label htmlFor="email">E-post</label>
                    <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    <InputError message={errors.email} />
                </fieldset>

                <Button type="submit" disabled={processing}>
                    Lagre endringer
                </Button>
                <TextLink href={route('password.edit')}>Endre passord</TextLink>
            </FormCard>
        </AppLayout>
    );
};

export default Profile;
