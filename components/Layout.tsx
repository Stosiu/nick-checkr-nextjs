import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto px-4 md:px-0'>{children}</main>

      <footer className='px-4 md:px-0'>
        <div className='mx-auto max-w-7xl'>
          <div className='m-4 mx-auto w-full rounded-2xl bg-gray-900 p-4 shadow md:flex md:items-center md:justify-between'>
            <span className='text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
              © {new Date().getFullYear()} Made with ❤️ by
              <a
                className='ml-1 text-gray-300'
                href='https://github.com/stosiu'
              >
                stosiu
              </a>
              .<br className='md:hidden' />
              {' '}All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
