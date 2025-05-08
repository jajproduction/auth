import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex items-center justify-center h-screen'>
      <Link href='/login'>
        <Button>Login</Button>
      </Link>
    </main>
  )
}
