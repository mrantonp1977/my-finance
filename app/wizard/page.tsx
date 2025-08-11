
import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex w-[700px] border-2 border-amber-400 py-28 px-18 flex-col items-center justify-between gap-6">
      <div>
        <h1 className="text-center text-4xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName}! 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-xl text-muted-foreground">
          Let&apos;s get started by setting up your currency
        </h2>
        <h3 className="mt-2 text-center text-lg text-muted-foreground">
          You can change this settings at any time
        </h3>
      </div>
      <Separator className='border-2 my-4'/>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>
            Currency
          </CardTitle>
          <CardDescription>
            Set your default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Button asChild className='w-full font-bold mt-6 text-lg p-6'>
        <Link href={"/"}>
        Continue to the dashboard
        </Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default page;
