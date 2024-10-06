import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username === 'user' && password === 'password') {
    return NextResponse.json({
      id: '1',
      name: 'User',
      isVip: false,
    })
  } else if (username === 'vip' && password === 'vippassword') {
    return NextResponse.json({
      id: '2',
      name: 'VIP User',
      isVip: true,
    })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}