'use client'

import { Button } from '@/components/ui/button'
import { deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Button
        onClick={async () => {
          await deleteSession()
          redirect('/login')
        }}
      >
        Logout
      </Button>
    </div>
  )
}
