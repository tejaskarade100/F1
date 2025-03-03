"use client"

import Image from 'next/image'

interface Team {
  name: string
  drivers: {
    name: string
    imageUrl: string
  }[]
  carImageUrl: string
  logoUrl: string
}

const getTeamCarUrl = (team: string) => {
  const teamName = team.toLowerCase().replace(/ /g, "-")
  return `https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/${teamName}.png`
}

const getTeamLogoUrl = (team: string) => {
  const teamName = team.toLowerCase().replace(/ /g, "-")
  return `https://media.formula1.com/content/dam/fom-website/teams/2025/${teamName}-logo.png`
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

const teams: Team[] = [
  {
    name: "Red Bull Racing",
    drivers: [
      {
        name: "Max Verstappen",
        imageUrl: getDriverImageUrl("Max Verstappen")
      },
      {
        name: "Liam Lawson",
        imageUrl: getDriverImageUrl("Liam Lawson")
      }
    ],
    carImageUrl: getTeamCarUrl("Red Bull Racing"),
    logoUrl: getTeamLogoUrl("Red Bull Racing")
  },
  {
    name: "Ferrari",
    drivers: [
      {
        name: "Charles Leclerc",
        imageUrl: getDriverImageUrl("Charles Leclerc")
      },
      {
        name: "Lewis Hamilton",
        imageUrl: getDriverImageUrl("Lewis Hamilton")
      }
    ],
    carImageUrl: getTeamCarUrl("Ferrari"),
    logoUrl: getTeamLogoUrl("Ferrari")
  },
  {
    name: "Mercedes",
    drivers: [
      {
        name: "George Russell",
        imageUrl: getDriverImageUrl("George Russell")
      },
      {
        name: "Andrea Kimi Antonelli",
        imageUrl: getDriverImageUrl("Andrea Kimi Antonelli")
      }
    ],
    carImageUrl: getTeamCarUrl("Mercedes"),
    logoUrl: getTeamLogoUrl("Mercedes")
  },
  {
    name: "McLaren",
    drivers: [
      {
        name: "Lando Norris",
        imageUrl: getDriverImageUrl("Lando Norris")
      },
      {
        name: "Oscar Piastri",
        imageUrl: getDriverImageUrl("Oscar Piastri")
      }
    ],
    carImageUrl: getTeamCarUrl("McLaren"),
    logoUrl: getTeamLogoUrl("McLaren")
  },
  {
    name: "Aston Martin",
    drivers: [
      {
        name: "Fernando Alonso",
        imageUrl: getDriverImageUrl("Fernando Alonso")
      },
      {
        name: "Lance Stroll",
        imageUrl: getDriverImageUrl("Lance Stroll")
      }
    ],
    carImageUrl: getTeamCarUrl("Aston Martin"),
    logoUrl: getTeamLogoUrl("Aston Martin")
  },
  {
    name: "Alpine",
    drivers: [
      {
        name: "Pierre Gasly",
        imageUrl: getDriverImageUrl("Pierre Gasly")
      },
      {
        name: "Jack Doohan",
        imageUrl: getDriverImageUrl("Jack Doohan")
      }
    ],
    carImageUrl: getTeamCarUrl("Alpine"),
    logoUrl: getTeamLogoUrl("Alpine")
  },
  {
    name: "Williams",
    drivers: [
      {
        name: "Alexander Albon",
        imageUrl: getDriverImageUrl("Alexander Albon")
      },
      {
        name: "Carlos Sainz",
        imageUrl: getDriverImageUrl("Carlos Sainz")
      }
    ],
    carImageUrl: getTeamCarUrl("Williams"),
    logoUrl: getTeamLogoUrl("Williams")
  },
  {
    name: "Racing Bulls",
    drivers: [
      {
        name: "Yuki Tsunoda",
        imageUrl: getDriverImageUrl("Yuki Tsunoda")
      },
      {
        name: "Isack Hadjar",
        imageUrl: getDriverImageUrl("Isack Hadjar")
      }
    ],
    carImageUrl: getTeamCarUrl("Racing Bulls"),
    logoUrl: getTeamLogoUrl("Racing Bulls")
  },
  {
    name: "Kick Sauber",
    drivers: [
      {
        name: "Nico Hulkenberg",
        imageUrl: getDriverImageUrl("Nico Hulkenberg")
      },
      {
        name: "Gabriel Bortoleto",
        imageUrl: getDriverImageUrl("Gabriel Bortoleto")
      }
    ],
    carImageUrl: getTeamCarUrl("Kick Sauber"),
    logoUrl: getTeamLogoUrl("Kick Sauber")
  },
  {
    name: "Haas",
    drivers: [
      {
        name: "Esteban Ocon",
        imageUrl: getDriverImageUrl("Esteban Ocon")
      },
      {
        name: "Oliver Bearman",
        imageUrl: getDriverImageUrl("Oliver Bearman")
      }
    ],
    carImageUrl: getTeamCarUrl("Haas"),
    logoUrl: getTeamLogoUrl("Haas")
  }
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">F1 Teams 2025</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {teams.map((team) => (
          <div key={team.name} 
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-3">
              {/* Team header with name and logo */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 relative">
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <h2 className="text-xl font-bold">{team.name}</h2>
                </div>
              </div>

              {/* Drivers section */}
              <div className="flex justify-between mb-4 px-2">
                {team.drivers.map((driver) => (
                  <div key={driver.name} className="flex items-center">
                    <div className="mr-2">
                      <div className="text-sm font-semibold text-gray-600">{driver.name.split(' ')[0]}</div>
                      <div className="text-base font-black">{driver.name.split(' ')[1]}</div>
                    </div>
                    <div className="w-12 h-12 relative">
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

              {/* Car section with grid background */}
              <div 
                className="relative h-[140px] rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                  `,
                  backgroundSize: '16px 16px'
                }}
              >
                <Image
                  src={team.carImageUrl}
                  alt={`${team.name} car`}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 