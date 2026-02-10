import { NextResponse } from 'next/server'

const users = [
  {
    id: '1',
    name: 'Alice Anderson',
    email: 'alice@blackroad.io',
    role: 'admin',
    avatar: '👩‍💼',
    projects: 3,
    tasksCompleted: 45
  },
  {
    id: '2',
    name: 'Bob Builder',
    email: 'bob@blackroad.io',
    role: 'developer',
    avatar: '👨‍💻',
    projects: 2,
    tasksCompleted: 32
  },
  {
    id: '3',
    name: 'Charlie Chen',
    email: 'charlie@blackroad.io',
    role: 'designer',
    avatar: '🎨',
    projects: 2,
    tasksCompleted: 28
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    count: users.length,
    data: users
  })
}
