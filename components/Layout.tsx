import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto'>{children}</main>
      <footer className='flex h-16 items-center justify-center bg-gray-800 text-sm text-white'>
        Made with ❤️ by
        <a className='ml-1 text-gray-400' href='https://github.com/stosiu'>
          stosiu
        </a>
      </footer>
    </div>
  );
};
