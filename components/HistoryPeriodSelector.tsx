'use client';

import { Period, Timeframe } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from './SkeletonWrapper';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { GetHistoryPeriodsResponseType } from '@/app/api/history-period/route';

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeFrame: Timeframe;
  setTimeFrame: (timeFrame: Timeframe) => void;
}

const HistoryPeriodSelector = ({
  period,
  setPeriod,
  timeFrame,
  setTimeFrame,
}: Props) => {
  const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ['overview', 'history', 'periods'],
    queryFn: () => fetch(`/api/history-period`).then((res) => res.json()),
  });

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
        <Tabs
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
          <YearSelector
            period={period}
            setPeriod={setPeriod}
            years={historyPeriods.data || []}
          />
        </SkeletonWrapper>
        {timeFrame === "month" && (
          <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  );
};

export default HistoryPeriodSelector;

function YearSelector({
  period,
  setPeriod,
  years,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
}) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) => {
        setPeriod({
          month: period.month,
          year: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem value={year.toString()} key={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MonthSelector({
  period,
  setPeriod,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
}) {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({
          year: period.year,
          month: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((month) => {
          const monthStr = new Date(period.year, month, 1).toLocaleString("default", {month: "long"})
          return (
          <SelectItem value={month.toString()} key={month}>
            {monthStr}
          </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  );
}
