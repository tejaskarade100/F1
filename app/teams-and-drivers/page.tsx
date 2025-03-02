"use client"

import Image from 'next/image'

interface Driver {
  name: string
  nationality: string
  team: string
  imageUrl: string
  flagUrl: string
}

const getDriverImageUrl = (name: string) => {
  const parts = name.split(' ')
  if (name === "Andrea Kimi Antonelli") {
    const driver_code = "ANDANT01"
    const full_name = "Andrea%20Kimi_Antonelli"
    return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/${driver_code}_${full_name}/${driver_code.toLowerCase()}.png`
  }

  const firstName = parts[0]
  const lastName = parts[parts.length - 1]
  const fullName = parts.join('_')
  const firstThreeFirst = firstName.slice(0, 3).toUpperCase()
  const firstThreeLast = lastName.slice(0, 3).toUpperCase()
  const driverCode = `${firstThreeFirst}${firstThreeLast}01`
  
  return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${driverCode[0]}/${driverCode}_${fullName}/${driverCode.toLowerCase()}.png`
}

const getFlagUrl = (country: string) => {
  const encodedCountry = encodeURIComponent(country)
  return `https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/${encodedCountry}.jpg`
}

const drivers: Driver[] = [
  {
    name: "Lewis Hamilton",
    nationality: "United Kingdom",
    team: "Ferrari",
    imageUrl: getDriverImageUrl("Lewis Hamilton"),
    flagUrl: getFlagUrl("United Kingdom")
  },
  {
    name: "Max Verstappen",
    nationality: "Netherlands",
    team: "Red Bull Racing",
    imageUrl: getDriverImageUrl("Max Verstappen"),
    flagUrl: getFlagUrl("Netherlands")
  },
  {
    name: "Liam Lawson",
    nationality: "New Zealand",
    team: "Red Bull Racing",
    imageUrl: getDriverImageUrl("Liam Lawson"),
    flagUrl: getFlagUrl("New Zealand")
  },
  {
    name: "George Russell",
    nationality: "United Kingdom",
    team: "Mercedes",
    imageUrl: getDriverImageUrl("George Russell"),
    flagUrl: getFlagUrl("United Kingdom")
  },
  {
    name: "Andrea Kimi Antonelli",
    nationality: "Italy",
    team: "Mercedes",
    imageUrl: getDriverImageUrl("Andrea Kimi Antonelli"),
    flagUrl: getFlagUrl("Italy")
  },
  {
    name: "Fernando Alonso",
    nationality: "Spain",
    team: "Aston Martin",
    imageUrl: getDriverImageUrl("Fernando Alonso"),
    flagUrl: getFlagUrl("Spain")
  },
  {
    name: "Lance Stroll",
    nationality: "Canada",
    team: "Aston Martin",
    imageUrl: getDriverImageUrl("Lance Stroll"),
    flagUrl: getFlagUrl("Canada")
  },
  {
    name: "Pierre Gasly",
    nationality: "France",
    team: "Alpine",
    imageUrl: getDriverImageUrl("Pierre Gasly"),
    flagUrl: getFlagUrl("France")
  },
  {
    name: "Jack Doohan",
    nationality: "Australia",
    team: "Alpine",
    imageUrl: getDriverImageUrl("Jack Doohan"),
    flagUrl: getFlagUrl("Australia")
  },
  {
    name: "Yuki Tsunoda",
    nationality: "Japan",
    team: "Racing Bulls",
    imageUrl: getDriverImageUrl("Yuki Tsunoda"),
    flagUrl: getFlagUrl("Japan")
  },
  {
    name: "Isack Hadjar",
    nationality: "France",
    team: "Racing Bulls",
    imageUrl: getDriverImageUrl("Isack Hadjar"),
    flagUrl: getFlagUrl("France")
  },
  {
    name: "Esteban Ocon",
    nationality: "France",
    team: "Haas",
    imageUrl: getDriverImageUrl("Esteban Ocon"),
    flagUrl: getFlagUrl("France")
  }
]

export default function TeamsAndDrivers() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8">Teams & Drivers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {drivers.map((driver) => (
          <div key={driver.name} className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="font-bold">{driver.name}</h2>
                  <p className="text-sm text-muted-foreground">{driver.team}</p>
                </div>
                <div className="w-8 h-6 relative">
                  <Image
                    src={driver.flagUrl}
                    alt={driver.nationality}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className="relative h-[300px]">
              <Image
                src={driver.imageUrl}
                alt={driver.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 