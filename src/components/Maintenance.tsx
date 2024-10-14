import React from 'react'
import { Wrench, Calendar, ThumbsUp } from 'lucide-react'
import ClimateSensorsOverview from './ClimateSensorsOverview'

const Maintenance: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Maintenance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-100 p-4 rounded-lg flex items-center">
          <Wrench className="w-8 h-8 text-purple-600 mr-3" />
          <div>
            <h3 className="font-semibold">Open Tickets</h3>
            <p className="text-2xl font-bold">23</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
          <Calendar className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold">Scheduled Maintenance</h3>
            <p className="text-2xl font-bold">7</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <ThumbsUp className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Customer Satisfaction</h3>
            <p className="text-2xl font-bold">95%</p>
          </div>
        </div>
      </div>

      <ClimateSensorsOverview />

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Maintenance Requests</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Issue</th>
              <th className="text-left p-2">Priority</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Royal Caribbean</td>
              <td className="p-2">Deck Sealing Inspection</td>
              <td className="p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Medium</span></td>
              <td className="p-2"><span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">In Progress</span></td>
            </tr>
            <tr>
              <td className="p-2">Marina Del Rey Yacht Club</td>
              <td className="p-2">Deck Board Replacement</td>
              <td className="p-2"><span className="bg-red-200 text-red-800 px-2 py-1 rounded">High</span></td>
              <td className="p-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Scheduled</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Maintenance