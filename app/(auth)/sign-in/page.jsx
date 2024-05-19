import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import LoginForm from './_components/Form';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

async function SignIn() {
  return (
    <div
      className={cn(
        outfit.className,
        'w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5 items-center bg-slate-100'
      )}
    >
      <h2 className='font-bold text-3xl text-green-700'>
        Log in to your account
      </h2>
      <h4 className='text-lg'>Enter your email and password to sign in</h4>
      <LoginForm />
      <p>
        Don't have an account?{' '}
        <span>
          <Link href='/create-account' className='text-green-700 text-lg'>
            Sign up!
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;

