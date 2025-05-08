'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { z } from 'zod'
import { useLoading } from '@/hooks/useLoading'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = z.object({
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

type LoginProps = z.infer<typeof formSchema>

export default function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { saveLoading, setSaveLoading } = useLoading('save')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<LoginProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSubmit(values: LoginProps) {
    const promise = axios.post('/api/auth/login', values)

    toast.promise(promise, {
      loading: 'Please wait...',
      success: 'Login successfully!'
    })

    try {
      setSaveLoading(true)
      const response = await promise
      if (response.status === 201) {
        form.reset()
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        toast.error('Your account is not verified!', { duration: 6000 })
      } else {
        toast.error("The credentials you've entered is incorrect", { icon: '😟', duration: 6000 })
      }
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
                  {saveLoading ? <Spinner size='small' show={true} /> : 'Login'}
                </Button>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link href='/register' className='underline underline-offset-4'>
                    Sign up
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
