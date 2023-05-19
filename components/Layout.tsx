import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto'>{children}</main>
      <footer className='mt-auto flex items-center justify-center bg-gray-800 py-4 text-xs text-white'>
        {new Date().getFullYear()} © Made with ❤️ by
        <a className='ml-1 text-gray-300' href='https://github.com/stosiu'>
          stosiu
        </a>
      </footer>
    </div>
  );
};
