import { useEffect, useState } from 'react'
import { getVehicles } from '../services/vehicleService'

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles()
        setVehicles(data)
      } catch (err) {
        setError('Araçlar yüklenemedi')
        console.error(err)
      }
    }

    fetchVehicles()
  }, [])

  return (
    <div>
      <h1>Vehicles Page</h1>

      {error && <p>{error}</p>}

      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <h3>{vehicle.brand} {vehicle.model}</h3>
          <p>Yıl: {vehicle.year}</p>
          <p>Plaka: {vehicle.plateNumber}</p>
          <p>KM: {vehicle.currentMileage}</p>
        </div>
      ))}
    </div>
  )
}

export default VehiclesPage