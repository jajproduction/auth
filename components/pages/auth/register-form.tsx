'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useLoading } from '@/hooks/useLoading'
import { Spinner } from '@/components/ui/spinner'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'First and last names are required.' })
    .refine(val => val.trim().length >= 2, {
      message: 'Name must not be empty!'
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .refine(val => val.trim().length > 0, {
      message: 'Email must not be empty!'
    }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(val => val.trim().length >= 8, {
      message: 'Password must not be empty!'
    })
})

type RegisterProps = z.infer<typeof formSchema>

export default function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { saveLoading, setSaveLoading } = useLoading('save')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<RegisterProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function handleSubmit(values: RegisterProps) {
    const promise = axios.post('/api/auth/register', values)

    toast.promise(promise, {
      loading: 'Please wait...',
      success: 'Acoount created successfully!',
      error: 'Could not create an account!.'
    })

    try {
      setSaveLoading(true)
      const response = await promise
      if (response.status === 201) {
        form.reset()
        window.location.href = '/login'
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Create an account</h1>
                  <p className='text-muted-foreground text-balance'>
                    To create your account, fill all the necessary information.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='John Doe' />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='jay@auth.com' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input {...field} type={showPassword ? 'text' : 'password'} />
                          <button
                            type='button'
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-zinc-500 hover:text-zinc-700'
                            onClick={() => setShowPassword(prev => !prev)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <IconEyeClosed className='w-4 h-4' />
                            ) : (
                              <IconEye className='w-4 h-4' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={saveLoading} className='w-full'>
                  {saveLoading ? <Spinner size='small' show={true} /> : 'Register'}
                </Button>
                <div className='text-center text-sm'>
                  Already have an account?{' '}
                  <Link href='/' className='underline underline-offset-4'>
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className='bg-muted relative hidden md:block'>
            <img
              src='/placeholder.svg'
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground text-center text-xs text-balance'>
        <p>Secured by Auth.</p>
      </div>
    </div>
  )
}
