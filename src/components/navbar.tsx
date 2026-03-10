import { getPostCount } from '@/lib/blog-count';
import { NavbarClient } from './navbar-client';

export function Navbar() {
  const blogCount = getPostCount();

  return <NavbarClient blogCount={blogCount} />;
}
