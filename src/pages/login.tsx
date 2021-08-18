import React, { FormEvent, ReactElement, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
import cx from 'clsx';
// import toast from 'react-hot-toast';

interface FormValues {
  email: string;
  password: string;
  isPermanent: boolean;
  teamId: string;
}

const initialFormValues: FormValues = {
  email: '',
  password: '',
  isPermanent: false,
  teamId: '',
};

export default function LoginPage(): ReactElement {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    console.log(formValues);
  }

  return (
    <div className={cx('w-screen', 'h-screen', 'flex')}>
      <div className={cx('w-7/12', 'bg-dark')} />
      <div className={cx('flex-grow', 'flex', 'flex-col', 'justify-center', 'items-center')}>
        <div className={cx('w-1/2')}>
          {/* <Image
            className={cx()}
            src="/img/logo.png"
            alt="Dutch Domino Team Logo"
            width="300"
            height="95"
          /> */}

          <h1 className={cx('font-bold', 'text-4xl', 'mb-4')}>Sign in</h1>
          <p className={cx('font-semibold', 'text-muted')}>Sign in to the DDT Project Manager</p>

          <hr className={cx('my-8', 'text-muted')} />

          <form onSubmit={handleSubmit}>
            <div className={cx('flex', 'flex-col', 'mb-4')}>
              <label htmlFor="email" className={cx('mb-1')}>
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="@mail.com"
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                value={formValues.email}
              />
            </div>
            <div className={cx('flex', 'flex-col', 'mb-4')}>
              <label htmlFor="password" className={cx('mb-1')}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                value={formValues.password}
              />
            </div>
            <div className={cx('flex', 'justify-between', 'mb-4')}>
              <label htmlFor="remember">
                <input
                  className={cx('mr-2')}
                  type="checkbox"
                  id="remember"
                  onChange={(e) => setFormValues({ ...formValues, isPermanent: e.target.checked })}
                  checked={formValues.isPermanent}
                />
                Remember me
              </label>
              {/* <Link href="/todo">
                <a>Forgot password?</a>
              </Link> */}
            </div>
            <button
              className={cx(
                'mt-2',
                'bg-primary',
                'text-white',
                'w-full',
                'py-3',
                'rounded-lg',
                'font-bold',
              )}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
