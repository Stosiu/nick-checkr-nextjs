import { QueryClient } from '@tanstack/query-core';

export const SITE_URL = process.env.SITE_URL || 'https://www.nickcheckr.com';
export const QUERY_CLIENT = new QueryClient();
