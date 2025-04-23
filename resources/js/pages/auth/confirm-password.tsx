// Components
import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Confirm your password"
        >
            <Head title="Confirm password" />

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="grid gap-2">
                       Password field here
                    </div>

                    <div className="flex items-center">
                        Button confirm password
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
