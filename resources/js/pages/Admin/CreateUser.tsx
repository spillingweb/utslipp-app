import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import AppLayout from '@/layouts/AppLayout';
import { Data, Role } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import styles from './CreateUser.module.css';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
};

const CreateUser = ({ roles }: { roles: Data<Role> }) => {
    const { data, setData, post, processing, errors, reset, cancel } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.user.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleCancel = () => {
        reset();
        cancel();
        router.get(route('admin.users'));
    };

    return (
        <AppLayout>
            <Head title="Opprett Bruker" />
            <FormCard heading="Opprett ny bruker" onSubmit={handleSubmit}>
                <fieldset className={styles.input}>
                    <label htmlFor="name">Navn</label>
                    <Input
                        id="name"
                        type="text"
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name && 'Navn er obligatorisk'} />
                </fieldset>
                <fieldset className={styles.input}>
                    <label htmlFor="email">E-postadresse</label>
                    <Input
                        id="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </fieldset>

                <fieldset className={styles.input}>
                    <label htmlFor="password">Midlertidig passord</label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </fieldset>

                <fieldset className={styles.input}>
                    <label htmlFor="password_confirmation">Bekreft midlertidig passord</label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.password_confirmation} />
                </fieldset>

                <fieldset className={styles.radioGroup}>
                    <p>Velg rolle</p>
                    {roles.data.map((role) => (
                        <Radio
                            key={role.id}
                            value={role.name}
                            label={role.name}
                            id={role.name}
                            name="role"
                            onChange={() => setData('role', role.id.toString())}
                            checked={data.role === role.id.toString()}
                        />
                    ))}
                    <InputError message={errors.role} />
                </fieldset>

                <div className={styles.cta}>
                    <Button type="submit">
                        Opprett bruker
                    </Button>
                    <Button variant="secondary" type="reset" onClick={() => handleCancel()}>
                        Avbryt
                    </Button>
                </div>
            </FormCard>
        </AppLayout>
    );
};

export default CreateUser;
