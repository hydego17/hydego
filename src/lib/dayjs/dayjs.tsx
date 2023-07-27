import { DayJsServer } from './dayjs.server';
import { DayJsClient } from './dayjs.client';

export default function DayJsProvider() {
  return (
    <>
      <DayJsServer />
      <DayJsClient />
    </>
  );
}
