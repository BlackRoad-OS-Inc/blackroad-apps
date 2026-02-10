import { NextResponse } from 'next/server'

let tasks = [
  {
    id: '1',
    projectId: '1',
    title: 'Design system architecture',
    description: 'Create comprehensive system design',
    status: 'completed',
    priority: 'high',
    assignee: 'Alice',
    dueDate: '2024-03-01',
    createdAt: new Date('2024-01-05').toISOString(),
    tags: ['architecture', 'design']
  },
  {
    id: '2',
    projectId: '1',
    title: 'Implement core modules',
    description: 'Build fundamental system modules',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Bob',
    dueDate: '2024-03-15',
    createdAt: new Date('2024-01-10').toISOString(),
    tags: ['development', 'core']
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')
  const status = searchParams.get('status')
  
  let filtered = tasks
  if (projectId) {
    filtered = filtered.filter(t => t.projectId === projectId)
  }
  if (status) {
    filtered = filtered.filter(t => t.status === status)
  }
  
  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const newTask = {
    id: String(tasks.length + 1),
    projectId: body.projectId,
    title: body.title,
    description: body.description || '',
    status: body.status || 'todo',
    priority: body.priority || 'medium',
    assignee: body.assignee || null,
    dueDate: body.dueDate || null,
    createdAt: new Date().toISOString(),
    tags: body.tags || []
  }
  
  tasks.push(newTask)
  
  return NextResponse.json({
    success: true,
    data: newTask
  }, { status: 201 })
}
