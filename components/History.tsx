'use client';

import { GetFormatterForCurrency } from '@/lib/helpers';
import { Period, TimeFrame } from '@/lib/types';
import { UserSettings } from '@prisma/client';
import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import HistoryPeriodSelector from './HistoryPeriodSelector';
import { Badge } from './ui/badge';

const History = ({ userSettings }: { userSettings: UserSettings }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="flex flex-wrap items-end justify-between gap-2 py-6 px-8">
      <h2 className="mt-8 text-3xl text-amber-400 font-bold">History</h2>
      <Card className="col-span-12 mt-4 w-full ">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col ">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />
            <div className="flex h-10 gap-2">
              <Badge
                className="flex items-center gap-2 text-md"
                variant={'outline'}
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                className="flex items-center gap-2 text-md"
                variant={'outline'}
              >
                <div className="h-4 w-4 rounded-full bg-rose-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default History;
