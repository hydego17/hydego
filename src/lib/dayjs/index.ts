import dynamic from 'next/dynamic';

const DayJsProvider = dynamic(() => import('./dayjs'));
export { DayJsProvider };
