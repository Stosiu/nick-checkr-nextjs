import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Layout } from '~/components/Layout';

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <NextSeo
        description='Ooops, looks like there is nothing here.'
        title='Page not found'
      />

      <div>Not found</div>
    </Layout>
  );
};

export default NotFoundPage;
