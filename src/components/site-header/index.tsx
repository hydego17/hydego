import dynamic from 'next/dynamic';

const SiteHeader = dynamic(() => import('./site-header'));
export { SiteHeader };
