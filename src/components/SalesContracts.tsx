import React, { useState } from 'react'
import { FileText, DollarSign, Users, Download, Calculator, FileCheck } from 'lucide-react'

interface Certificate {
  id: string;
  name: string;
  date: string;
}

interface ProjectCalculation {
  squareMeters: string;
  climateSensors: string;
  premiumMaterials: boolean;
  customDesign: boolean;
  installationService: boolean;
}

const certificates: Certificate[] = [
  { id: 'cert1', name: 'ISO 9001:2015 Quality Management', date: '2023-01-15' },
  { id: 'cert2', name: 'ISO 14001:2015 Environmental Management', date: '2023-02-20' },
  { id: 'cert3', name: 'OHSAS 18001:2007 Occupational Health and Safety', date: '2023-03-10' },
]

const SalesContracts: React.FC = () => {
  const [calculation, setCalculation] = useState<ProjectCalculation>({
    squareMeters: '',
    climateSensors: '',
    premiumMaterials: false,
    customDesign: false,
    installationService: false,
  })
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  const handleDownload = (certificateId: string) => {
    console.log(`Downloading certificate: ${certificateId}`)
    alert('In a real application, this would download the certificate PDF.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCalculation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const calculatePrice = () => {
    const squareMeters = parseFloat(calculation.squareMeters) || 0
    const climateSensors = parseFloat(calculation.climateSensors) || 0
    const basePricePerSqm = 100 // Base price per square meter
    const sensorPrice = 50 // Price per climate sensor
    const premiumMaterialsMultiplier = 1.5
    const customDesignFee = 5000
    const installationFeePerSqm = 20

    let total = squareMeters * basePricePerSqm
    total += climateSensors * sensorPrice

    if (calculation.premiumMaterials) {
      total *= premiumMaterialsMultiplier
    }

    if (calculation.customDesign) {
      total += customDesignFee
    }

    if (calculation.installationService) {
      total += squareMeters * installationFeePerSqm
    }

    setTotalPrice(total)
  }

  const generateOffer = () => {
    if (totalPrice === null) {
      alert('Please calculate the price first.')
      return
    }

    const offerContent = `
Project Offer

Square Meters: ${calculation.squareMeters}
Climate Sensors: ${calculation.climateSensors}
Premium Materials: ${calculation.premiumMaterials ? 'Yes' : 'No'}
Custom Design: ${calculation.customDesign ? 'Yes' : 'No'}
Installation Service: ${calculation.installationService ? 'Yes' : 'No'}

Total Price: $${totalPrice.toFixed(2)}

Thank you for considering our services!
    `

    const blob = new Blob([offerContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project_offer.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sales & Contracts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <FileText className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Active Contracts</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <DollarSign className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">$1.2M</p>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg flex items-center">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <div>
            <h3 className="font-semibold">New Clients</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Project Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              Square Meters:
              <input
                type="number"
                name="squareMeters"
                value={calculation.squareMeters}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
                min="0"
              />
            </label>
            <label className="block mb-2">
              Number of Climate Sensors:
              <input
                type="number"
                name="climateSensors"
                value={calculation.climateSensors}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
                min="0"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="premiumMaterials"
                checked={calculation.premiumMaterials}
                onChange={handleInputChange}
              />
              Premium Materials
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="customDesign"
                checked={calculation.customDesign}
                onChange={handleInputChange}
              />
              Custom Design
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="installationService"
                checked={calculation.installationService}
                onChange={handleInputChange}
              />
              Installation Service
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={calculatePrice}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mr-2"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Price
          </button>
          {totalPrice !== null && (
            <>
              <p className="text-xl font-bold mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={generateOffer}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center mt-2"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Generate Offer
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Contracts</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Value</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Oceanic Cruises</td>
              <td className="p-2">Cruise Ship Deck Renovation</td>
              <td className="p-2">$2.5M</td>
              <td className="p-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Active</span></td>
            </tr>
            <tr>
              <td className="p-2">Marina Bay Resort</td>
              <td className="p-2">Waterfront Deck Installation</td>
              <td className="p-2">$1.8M</td>
              <td className="p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">{cert.name}</h4>
              <p className="text-sm text-gray-600 mb-2">Issued: {cert.date}</p>
              <button
                onClick={() => handleDownload(cert.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalesContracts