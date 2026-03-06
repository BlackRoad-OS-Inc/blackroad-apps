'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  id: string
  name: string
  description: string
  status: string
  priority: string
  tasks: number
  completedTasks: number
  team: string[]
  createdAt: string
}

interface Task {
  id: string
  projectId: string
  title: string
  status: string
  priority: string
  assignee: string | null
  dueDate: string | null
}

interface Stats {
  totalProjects: number
  inProgress: number
  totalTasks: number
  completedTasks: number
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<Stats>({ totalProjects: 0, inProgress: 0, totalTasks: 0, completedTasks: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/tasks').then(r => r.json()),
    ]).then(([projectsData, tasksData]) => {
      const p: Project[] = projectsData.data || []
      const t: Task[] = tasksData.data || []
      setProjects(p)
      setTasks(t)
      setStats({
        totalProjects: p.length,
        inProgress: p.filter(x => x.status === 'in_progress').length,
        totalTasks: t.length,
        completedTasks: t.filter(x => x.status === 'completed').length,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blackroad-900 via-purple-900 to-blackroad-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">🗺️ RoadMap Dashboard</h1>
            <p className="text-gray-400 mt-1">Track your projects and tasks</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Projects" value={stats.totalProjects} icon="📁" />
          <StatCard label="In Progress" value={stats.inProgress} icon="🔄" />
          <StatCard label="Total Tasks" value={stats.totalTasks} icon="✅" />
          <StatCard label="Completed" value={stats.completedTasks} icon="🎯" />
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projects */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Projects</h2>
              {projects.length === 0 ? (
                <p className="text-gray-400">No projects yet.</p>
              ) : (
                <ul className="space-y-3">
                  {projects.map(project => (
                    <li key={project.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{project.name}</span>
                        <StatusBadge status={project.status} />
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/10 rounded-full h-1.5">
                          <div
                            className="bg-blackroad-500 h-1.5 rounded-full"
                            style={{ width: project.tasks > 0 ? `${(project.completedTasks / project.tasks) * 100}%` : '0%' }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs">{project.completedTasks}/{project.tasks}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent Tasks */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Recent Tasks</h2>
              {tasks.length === 0 ? (
                <p className="text-gray-400">No tasks yet.</p>
              ) : (
                <ul className="space-y-3">
                  {tasks.slice(0, 6).map(task => (
                    <li key={task.id} className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                      <span className="text-lg mt-0.5">{task.status === 'completed' ? '✅' : task.status === 'in_progress' ? '🔄' : '📋'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm truncate">{task.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <PriorityBadge priority={task.priority} />
                          {task.assignee && <span className="text-gray-400 text-xs">→ {task.assignee}</span>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-5 border border-white/20 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    in_progress: 'bg-blue-500/30 text-blue-300',
    completed: 'bg-green-500/30 text-green-300',
    planning: 'bg-yellow-500/30 text-yellow-300',
    on_hold: 'bg-red-500/30 text-red-300',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[status] || 'bg-gray-500/30 text-gray-300'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    high: 'bg-red-500/30 text-red-300',
    medium: 'bg-yellow-500/30 text-yellow-300',
    low: 'bg-green-500/30 text-green-300',
  }
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${colors[priority] || 'bg-gray-500/30 text-gray-300'}`}>
      {priority}
    </span>
  )
}
