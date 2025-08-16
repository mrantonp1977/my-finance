'use client';

import { DateRangePicker } from '@/components/date-range-picker';
import TransactionTable from '@/components/TransactionTable';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { differenceInDays, startOfMonth } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'sonner';

const TransactionsPage = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="border-b bg-card">
        <div className="flex flex-wrap items-center mx-6 justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold text-amber-500">
              Transaction History
            </p>
          </div>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
                );
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center mx-6 justify-between gap-6 py-8">
        <TransactionTable 
          from={dateRange.from} to={dateRange.to}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
