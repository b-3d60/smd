import React, { useState } from 'react'
import { Calendar, Clock, CheckSquare, X } from 'lucide-react'
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge, 
  NodeProps, 
  MarkerType 
} from 'reactflow'
import 'reactflow/dist/style.css'

interface ProcessStep {
  id: string;
  label: string;
  description: string;
  status: 'open' | 'in progress' | 'completed';
  type?: string;
}

const processSteps: ProcessStep[] = [
  { id: '1', label: 'Project Initiation', description: 'Define project goals, scope, and stakeholders', status: 'completed' },
  { id: '2', label: 'Planning', description: 'Develop project plan, schedule, and resource allocation', status: 'in progress' },
  { id: '3', label: 'Approval Gate', description: 'Project plan approval by stakeholders', status: 'open', type: 'approvalGate' },
  { id: '4', label: 'Execution', description: 'Implement project tasks and deliverables', status: 'open' },
  { id: '5', label: 'Quality Gate', description: 'Ensure deliverables meet quality standards', status: 'open', type: 'qualityGate' },
  { id: '6', label: 'Testing', description: 'Conduct thorough testing of deliverables', status: 'open' },
  { id: '7', label: 'Final Approval', description: 'Obtain final approval from stakeholders', status: 'open', type: 'approvalGate' },
  { id: '8', label: 'Deployment', description: 'Deploy the project deliverables', status: 'open' },
  { id: '9', label: 'Closure', description: 'Finalize deliverables, conduct project review', status: 'open' },
]

const initialNodes: Node[] = processSteps.map((step, index) => ({
  id: step.id,
  position: { x: (index % 3) * 250, y: Math.floor(index / 3) * 150 },
  data: { label: step.label, step },
  type: step.type || 'default',
}))

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e5-4', source: '5', target: '4', type: 'step', style: { stroke: 'red' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'red' }, label: 'Fail' },
  { id: 'e7-6', source: '7', target: '6', type: 'step', style: { stroke: 'red' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'red' }, label: 'Reject' },
]

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  const getNodeStyle = () => {
    switch (data.step.type) {
      case 'approvalGate':
        return 'bg-yellow-100 border-yellow-500'
      case 'qualityGate':
        return 'bg-green-100 border-green-500'
      default:
        return 'bg-white border-gray-300'
    }
  }

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 ${getNodeStyle()}`}>
      <div className="font-bold">{data.label}</div>
      <div className="text-xs">{data.step.status}</div>
    </div>
  )
}

const nodeTypes = {
  default: CustomNode,
  approvalGate: CustomNode,
  qualityGate: CustomNode,
}

interface GanttTask {
  id: number;
  name: string;
  start: Date;
  end: Date;
  progress: number;
}

const ganttTasks: GanttTask[] = [
  { id: 1, name: 'Project Initiation', start: new Date('2023-07-01'), end: new Date('2023-07-15'), progress: 100 },
  { id: 2, name: 'Planning', start: new Date('2023-07-16'), end: new Date('2023-08-15'), progress: 70 },
  { id: 3, name: 'Execution', start: new Date('2023-08-16'), end: new Date('2023-11-15'), progress: 30 },
  { id: 4, name: 'Testing', start: new Date('2023-11-16'), end: new Date('2023-12-15'), progress: 0 },
  { id: 5, name: 'Deployment', start: new Date('2023-12-16'), end: new Date('2023-12-31'), progress: 0 },
]

const SimpleGanttChart: React.FC<{ tasks: GanttTask[] }> = ({ tasks }) => {
  const startDate = new Date('2023-07-01')
  const endDate = new Date('2023-12-31')
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const getPositionAndWidth = (task: GanttTask) => {
    const left = Math.ceil((task.start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100
    const width = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100
    return { left: `${left}%`, width: `${width}%` }
  }

  return (
    <div className="w-full">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center mb-2">
          <div className="w-1/4 pr-4">{task.name}</div>
          <div className="w-3/4 h-6 bg-gray-200 rounded relative">
            <div
              className="absolute h-full bg-blue-500 rounded"
              style={getPositionAndWidth(task)}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                {task.progress}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const ProjectManagement: React.FC = () => {
  const [nodes] = useState(initialNodes)
  const [edges] = useState(initialEdges)
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null)

  const getDateDiff = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const startDate = new Date('2023-07-01')
  const endDate = new Date('2023-12-31')

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedStep(node.data.step)
  }

  const closePopup = () => {
    setSelectedStep(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-200 text-green-800'
      case 'in progress':
        return 'bg-yellow-200 text-yellow-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Calendar className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Project Duration</h3>
            <p className="text-2xl font-bold">{getDateDiff(startDate, endDate)} days</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <Clock className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Time Elapsed</h3>
            <p className="text-2xl font-bold">{getDateDiff(startDate, new Date())} days</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
          <CheckSquare className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold">Tasks Completed</h3>
            <p className="text-2xl font-bold">45%</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Process Map</h3>
        <div style={{ height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>

      {selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedStep.label}</h3>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="mb-4">{selectedStep.description}</p>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Status:</span>
              <span className={`px-2 py-1 rounded ${getStatusColor(selectedStep.status)}`}>
                {selectedStep.status}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Project Timeline</h3>
        <SimpleGanttChart tasks={ganttTasks} />
      </div>
    </div>
  )
}

export default ProjectManagement