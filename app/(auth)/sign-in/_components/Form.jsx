'use client';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import GlobalAPI from '@/app/_utils/GlobalAPI';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const res = await GlobalAPI.signInUser(data);

      if (res.error) {
        toast.error(`Error: ${res.message}`);
        return;
      }

      if (res.status === 200) {
        toast.success('Successful login!');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('jwt', res.data.jwt);

        router.replace('/');
      } else {
        toast.error('Failed to login to account. Please try again.');
      }
      setLoader(false);
    } catch (error) {
      toast.error('An unexpected error occurred.');
      setLoader(false);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      router.replace('/');
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 flex flex-col items-center min-w-[50vw]'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='example@example.com'
                  {...field}
                  autoComplete='on'
                />
              </FormControl>
              <FormDescription>Enter your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='******'
                    {...field}
                    autoComplete='on'
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormDescription>Choose a secure password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid}
          className='w-full'
        >
          {loader ? <Loader className='animate-spin' /> : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;

