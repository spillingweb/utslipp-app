import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import AppLayout from '@/layouts/AppLayout';
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

export const ROLE_RADIO_OPTIONS = [
    { label: 'Administrator og redigering', value: 'admin' },
    { label: 'Kun redigering', value: 'redigering' },
    { label: 'Kun innsyn', value: 'innsyn' },
];

const CreateUser = () => {
    const { data, setData, post, processing, errors, reset, cancel } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleRoleChange = (roleName: string) => {
        if (data.role !== roleName) {
            setData('role', roleName);
        }
    };

    const handleCancel = () => {
        reset();
        cancel();
        router.get(route('admin'));
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
                        required
                        autoFocus
                        tabIndex={1}
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
                        type="email"
                        required
                        tabIndex={2}
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
                        required
                        tabIndex={3}
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
                        required
                        tabIndex={4}
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.password_confirmation} />
                </fieldset>

                <fieldset>
                    <legend>Velg rolle for brukeren</legend>
                    <div className={styles.radioBtns}>
                        {ROLE_RADIO_OPTIONS.map((option) => (
                            <Radio
                                key={option.value}
                                label={option.label}
                                name="roles"
                                id={option.value}
                                value={option.value}
                                onChange={() => handleRoleChange(option.value)}
                                checked={data.role === option.value}
                            />
                        ))}
                    </div>
                </fieldset>

                <div className={styles.cta}>
                    <Button type="submit" tabIndex={5}>
                        Opprett bruker
                    </Button>
                    <Button variant="secondary" type="reset" onClick={() => handleCancel()} tabIndex={4}>
                        Avbryt
                    </Button>
                </div>
            </FormCard>
        </AppLayout>
    );
};

export default CreateUser;
