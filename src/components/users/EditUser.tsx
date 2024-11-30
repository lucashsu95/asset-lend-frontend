import { useUsers } from '@/contexts/UsersContext';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Form from '@/components/ui/form';

interface FormData {
    email: string;
    password: string;
    role: string;
    access_token?: string;
}

export default function EditUser({ userId, onClose }: { userId: number; onClose: () => void }) {
    const { users, updateUser, addUser } = useUsers();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            role: ''
        }
    });

    const user = users.find((user) => user.id === userId);

    const onSubmit = (data: FormData) => {
        if (userId) {
            if (user) {
                updateUser(userId, data);
            } else {
                addUser(data);
            }
        } else {
            console.error('Invalid user ID');
        }
        onClose();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} title='Edit User'>
                <div>
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type='email'
                        {...register('email', {
                            required: '必填欄位',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: '不合法的Email格式'
                            }
                        })}
                        className='input'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type='password'
                        {...register('password', {
                            required: '必填欄位'
                        })}
                        className='input'
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <Button type='submit'>儲存</Button>
            </Form>
        </div>
    );
}