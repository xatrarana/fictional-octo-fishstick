'use client';
import { contactFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


import * as z from "zod"
import ContactFormWrapper from './contact-form-wrapper';
import { Form, FormField, FormItem, FormMessage, FormControl } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FormErorr } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '@/components/ui/button';
const ContactFrom = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string | boolean>('');

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    console.log(values)
  }

  return (
    <ContactFormWrapper
    cardTitle='सम्पर्क गर्नुहोस्'
    cardDesc='तपाईंसँग कुनै प्रश्न छ भने कृपया हामीलाई एक लाइन छोड्नुहोस्।'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='पुरा नाम'
                      className='h-14'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='इमेल'
                      className='h-14'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='विषय'
                      className='h-14'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder='सन्देश'

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-3'>
            <FormErorr message={error} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-700"
              disabled={false}
              size={"lg"}
            >
              {
                false ? <span className="loading loading-dots loading-md"></span> : "पेश गर्नुहोस्"
              }
            </Button>
          </div>

        </form>
      </Form>
    </ContactFormWrapper>

  )
}

export default ContactFrom