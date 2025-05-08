'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

export default function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Create an account</h1>
                <p className='text-muted-foreground text-balance'>
                  To create your account, fill all the necessary information.
                </p>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' type='text' placeholder='John Doe' required />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='jay@auth.com' required />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input type={showPassword ? 'text' : 'password'} />
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
              </div>
              <Button type='submit' className='w-full'>
                Register
              </Button>
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link href='/' className='underline underline-offset-4'>
                  Sign in
                </Link>
              </div>
            </div>
          </form>
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
