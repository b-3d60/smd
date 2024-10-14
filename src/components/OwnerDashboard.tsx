import React from 'react'
import { DollarSign, Users, Briefcase, TrendingUp, Calendar, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts'

interface Project {
  id: string;
  name: string;
  value: number;
  startDate: string;
  endDate: string;
}

interface Client {
  id: string;
  name: string;
  projects: Project[];
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Oceanic Cruises',
    projects: [
      { id: '1', name: 'Cruise Ship Deck Renovation', value: 2500000, startDate: '2023-01-15', endDate: '2023-06-30' },
      { id: '2', name: 'Luxury Yacht Refurbishment', value: 1200000, startDate: '2023-03-01', endDate: '2023-08-15' },
    ],
  },
  {
    id: '2',
    name: 'Marina Bay Resort',
    projects: [
      { id: '3', name: 'Waterfront Deck Installation', value: 1800000, startDate: '2023-02-01', endDate: '2023-07-31' },
      { id: '4', name: 'Beach Club Upgrade', value: 900000, startDate: '2023-04-15', endDate: '2023-09-30' },
    ],
  },
  {
    id: '3',
    name: 'Coastal Developments Inc.',
    projects: [
      { id: '5', name: 'Seaside Condo Complex', value: 3500000, startDate: '2023-01-01', endDate: '2023-12-31' },
    ],
  },
]

const OwnerDashboard: React.FC = () => {
  const totalProjectValue = mockClients.reduce((total, client) => 
    total + client.projects.reduce((clientTotal, project) => clientTotal + project.value, 0), 0
  )
  const totalCommission = totalProjectValue * 0.1
  const totalClients = mockClients.length
  const totalProjects = mockClients.reduce((total, client) => total + client.projects.length, 0)
  const averageProjectValue = totalProjectValue / totalProjects
  const largestProject = mockClients.flatMap(client => client.projects).reduce((largest, project) => 
    project.value > largest.value ? project : largest
  )

  const clientProjectData = mockClients.map(client => ({
    name: client.name,
    projects: client.projects.length,
    value: client.projects.reduce((total, project) => total + project.value, 0)
  }))

  const projectValueDistribution = mockClients.flatMap(client => 
    client.projects.map(project => ({ name: project.name, value: project.value }))
  )

  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2023, i, 1).toLocaleString('default', { month: 'short' })
    const value = mockClients.flatMap(client => client.projects)
      .filter(project => {
        const startDate = new Date(project.startDate)
        const endDate = new Date(project.endDate)
        const currentMonth = new Date(2023, i, 1)
        return startDate <= currentMonth && endDate >= currentMonth
      })
      .reduce((total, project) => {
        const projectMonths = (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
        return total + (project.value / projectMonths)
      }, 0)
    return { name: month, value: value }
  })

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Total Commission</h3>
            <p className="text-2xl font-bold">${totalCommission.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <Users className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Total Clients</h3>
            <p className="text-2xl font-bold">{totalClients}</p>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg flex items-center">
          <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
          <div>
            <h3 className="font-semibold">Total Projects</h3>
            <p className="text-2xl font-bold">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
          <TrendingUp className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold">Average Project Value</h3>
            <p className="text-2xl font-bold">${averageProjectValue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg flex items-center">
          <Award className="w-8 h-8 text-red-600 mr-3" />
          <div>
            <h3 className="font-semibold">Largest Project</h3>
            <p className="text-xl font-bold">${largestProject.value.toLocaleString()}</p>
            <p className="text-sm">{largestProject.name}</p>
          </div>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg flex items-center">
          <Calendar className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h3 className="font-semibold">Active Projects</h3>
            <p className="text-2xl font-bold">
              {mockClients.flatMap(client => client.projects).filter(project => 
                new Date(project.endDate) >= new Date()
              ).length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Client Project Distribution</h3>
          <BarChart width={500} height={300} data={clientProjectData}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="projects" fill="#8884d8" name="Number of Projects" />
            <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Total Value" />
          </BarChart>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Project Value Distribution</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={projectValueDistribution}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {projectValueDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monthly Revenue Projection</h3>
        <LineChart width={1000} height={300} data={monthlyRevenue}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Project</th>
              <th className="text-right p-2">Project Value</th>
              <th className="text-right p-2">Commission (10%)</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map((client) => (
              <React.Fragment key={client.id}>
                {client.projects.map((project, index) => (
                  <tr key={project.id} className="border-b">
                    {index === 0 && (
                      <td className="p-2" rowSpan={client.projects.length}>
                        {client.name}
                      </td>
                    )}
                    <td className="p-2">{project.name}</td>
                    <td className="p-2 text-right">${project.value.toLocaleString()}</td>
                    <td className="p-2 text-right">${(project.value * 0.1).toLocaleString()}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="p-2" colSpan={2}>Total</td>
              <td className="p-2 text-right">${totalProjectValue.toLocaleString()}</td>
              <td className="p-2 text-right">${totalCommission.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default OwnerDashboard