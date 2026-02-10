import { NextResponse } from 'next/server'

// In-memory database (replace with real DB in production)
let projects = [
  {
    id: '1',
    name: 'BlackRoad OS Development',
    description: 'Core operating system development',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2024-01-01').toISOString(),
    tasks: 12,
    completedTasks: 7,
    team: ['Alice', 'Bob', 'Charlie']
  },
  {
    id: '2',
    name: 'RoadMap Platform',
    description: 'Project management platform',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2024-02-01').toISOString(),
    tasks: 8,
    completedTasks: 3,
    team: ['Alice', 'David']
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  
  let filtered = projects
  if (status) {
    filtered = projects.filter(p => p.status === status)
  }
  
  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const newProject = {
    id: String(projects.length + 1),
    name: body.name,
    description: body.description || '',
    status: body.status || 'planning',
    priority: body.priority || 'medium',
    createdAt: new Date().toISOString(),
    tasks: 0,
    completedTasks: 0,
    team: body.team || []
  }
  
  projects.push(newProject)
  
  return NextResponse.json({
    success: true,
    data: newProject
  }, { status: 201 })
}
