import CreateTransactionDialog from '@/components/CreateTransactionDialog';
import Overview from '@/components/Overview';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    redirect('/wizard');
  }

  return (
    <div className="h-full bg-background">
      <div className="border-b-2 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8 px-18">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>
          <div className="flex items-center gap-7">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'default'}
                  className="bg-black border-emerald-400 border hover:bg-emerald-600 text-white text-md"
                >
                  New Income 😊
                </Button>
              }
              type="income"
            />

            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'default'}
                  className="bg-black border-rose-400 border text-white hover:bg-rose-500 text-md"
                >
                  New Expense 😔
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings}/>
    </div>
  );
}
