import { loginUser } from '@/services/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await loginUser(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status })
  }
}
