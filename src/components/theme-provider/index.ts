import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(() => import('./theme-provider'));
export { ThemeProvider };
