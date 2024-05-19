import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import CreateForm from './_components/Form';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

async function CreateAccount() {
  return (
    <div
      className={cn(
        outfit.className,
        'w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5 items-center bg-slate-100'
      )}
    >
      <h2 className='font-bold text-3xl text-green-700'>Create an account</h2>
      <h4 className='text-lg'>
        Enter your email and password to create and account
      </h4>
      <CreateForm className='w-full' />
      <p>
        Already have an account?{' '}
        <span>
          <Link href='/sign-in' className='text-green-700 text-lg'>
            Sign in!
          </Link>
        </span>
      </p>
    </div>
  );
}

export default CreateAccount;

