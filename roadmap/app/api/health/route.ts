import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'RoadMap API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    features: [
      'Real-time collaboration',
      'Project management',
      'Task tracking',
      'Team analytics'
    ]
  })
}
