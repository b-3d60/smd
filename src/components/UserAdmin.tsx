import React, { useState } from 'react'
import { User, UserPlus, UserMinus, Edit, Save, FileText } from 'lucide-react'

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  activity: string;
  startTime: Date;
  endTime: Date | null;
}

interface Project {
  id: string;
  name: string;
}

interface UserAdminProps {
  timeEntries: TimeEntry[];
  projects: Project[];
  currentUser: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Engineer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
]

const UserAdmin: React.FC<UserAdminProps> = ({ timeEntries, projects, currentUser }) => {
  const [users, setUsers] = useState<UserData[]>(mockUsers)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' })
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: (users.length + 1).toString() }])
      setNewUser({ name: '', email: '', role: '' })
    }
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const startEditing = (user: UserData) => {
    setEditingUser(user)
  }

  const saveEdit = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
      setEditingUser(null)
    }
  }

  const generateDailyReport = () => {
    const today = new Date()
    const todayEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.startTime)
      return entryDate.toDateString() === today.toDateString() && entry.userId === currentUser
    })

    let reportContent = `Daily Time Tracking Report - ${today.toDateString()}\n\n`

    projects.forEach(project => {
      const projectEntries = todayEntries.filter(entry => entry.projectId === project.id)
      if (projectEntries.length > 0) {
        let totalTime = 0
        projectEntries.forEach(entry => {
          const endTime = entry.endTime ? new Date(entry.endTime) : new Date()
          totalTime += endTime.getTime() - new Date(entry.startTime).getTime()
        })
        const hours = Math.floor(totalTime / (1000 * 60 * 60))
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
        reportContent += `${project.name}: ${hours}h ${minutes}m\n`
      }
    })

    reportContent += '\nApproved by Site Manager: ____________________'

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily_report_${today.toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Administration</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New User</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            className="border rounded px-2 py-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className="border rounded px-2 py-1"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Engineer">Engineer</option>
            <option value="Manager">Manager</option>
          </select>
          <button onClick={addUser} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">User List</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-2">
                  {editingUser?.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Manager">Manager</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-2">
                  {editingUser?.id === user.id ? (
                    <button onClick={saveEdit} className="text-green-600 mr-2">
                      <Save className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={() => startEditing(user)} className="text-blue-600 mr-2">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => deleteUser(user.id)} className="text-red-600">
                    <UserMinus className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Time Entries</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Activity</th>
              <th className="text-left p-2">Start Time</th>
              <th className="text-left p-2">End Time</th>
              <th className="text-left p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.filter(entry => entry.userId === currentUser).map((entry) => {
              const project = projects.find(p => p.id === entry.projectId)
              const startTime = new Date(entry.startTime)
              const endTime = entry.endTime ? new Date(entry.endTime) : new Date()
              const duration = endTime.getTime() - startTime.getTime()
              const hours = Math.floor(duration / (1000 * 60 * 60))
              const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
              return (
                <tr key={entry.id}>
                  <td className="p-2">{project?.name}</td>
                  <td className="p-2">{entry.activity}</td>
                  <td className="p-2">{startTime.toLocaleString()}</td>
                  <td className="p-2">{entry.endTime ? endTime.toLocaleString() : 'Ongoing'}</td>
                  <td className="p-2">{`${hours}h ${minutes}m`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={generateDailyReport}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Daily Report
        </button>
      </div>
    </div>
  )
}

export default UserAdmin