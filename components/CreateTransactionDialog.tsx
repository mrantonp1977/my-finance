'use client';

import { TransactionType } from '@/lib/types';
import { ReactNode, useCallback, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from '@/schema/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import CategoryPicker from './CategoryPicker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTransaction } from '@/app/(dashboard)/_actions/transactions';
import { toast } from 'sonner';
import { DateToUTCDate } from '@/lib/helpers';

interface Props {
  trigger: ReactNode;
  type: TransactionType;
}

const CreateTransactionDialog = ({ trigger, type }: Props) => {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
      description: '',
      amount: 0,
      category: '',
    },
  });

  const [open, setOpen] = useState(false);

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue('category', value);
    },
    [form]
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success('Transaction creared successfully! 🎉', {
        id: 'create-transaction',
      });
      form.reset({
        type,
        description: '',
        amount: 0,
        date: new Date(),
        category: undefined,
      });
      queryClient.invalidateQueries({
        queryKey: ['overview'],
      });
      setOpen((prev) => !prev);
    },
  });

  const onSubmit = useCallback(
    (values: CreateTransactionSchemaType) => {
      toast.loading('Creating transaction...', {
        id: 'create-transaction',
      });
      mutate({
        ...values,
        date: DateToUTCDate(values.date),
      });
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new{' '}
            <span
              className={cn(
                'm-2 font-bold',
                type === 'income' ? 'text-emerald-500' : 'text-rose-500'
              )}
            >
              {type}
            </span>{' '}
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction Description (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction amount (required)
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        type={type}
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <FormDescription>Select a category</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Transaction date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[200px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(value) => {
                            if (!value) return;
                            field.onChange(value);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select a date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="ml-4"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {!isPending && 'Create'}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
