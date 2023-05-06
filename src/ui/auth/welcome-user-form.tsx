'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { fetcher } from '~/lib/fetcher';
import { newUserSchema, type NewUserSchema } from '~/lib/schemas';

export const WelcomeUserForm = () => {
  const session = useSession();
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = async (data: NewUserSchema) => {
    try {
      await fetcher('/api/auth/new-user', {
        method: 'POST',
        body: data,
      });

      toast.success('Username Assigned');

      router.push('/home');
    } catch (error) {
      toast.error('Something went wrong. Check the console.');
    }
  };

  return (
    <div>
      <h2>New User Form</h2>

      <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)} className="flex flex-col gap-2">
        {session.data && (
          <input type="text" hidden {...register('userId', { value: session.data.user.id })} />
        )}

        <label htmlFor="username">Username</label>
        <input className="bg-neutral-700" {...register('username')} />

        {formState.errors.username && (
          <span className="text-red-400">{formState.errors.username.message}</span>
        )}

        <input type="submit" />
      </form>
    </div>
  );
};
