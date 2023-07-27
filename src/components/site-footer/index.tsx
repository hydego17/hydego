import dynamic from 'next/dynamic';

const SiteFooter = dynamic(() => import('./site-footer'));
export { SiteFooter };
