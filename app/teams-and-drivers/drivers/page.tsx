"use client"

import Image from 'next/image'

interface Driver {
  name: string
  nationality: string
  team: string
  imageUrl: string
  flagUrl: string
  teamLogoUrl: string
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

const getTeamLogoUrl = (team: string) => {
  const teamName = team.toLowerCase().replace(" ", "-")
  return `https://media.formula1.com/content/dam/fom-website/teams/2025/${teamName}-logo.png`
}

const drivers: Driver[] = [
  // Ferrari
  {
    name: "Charles Leclerc",
    nationality: "Monaco",
    team: "Ferrari",
    imageUrl: getDriverImageUrl("Charles Leclerc"),
    flagUrl: getFlagUrl("Monaco"),
    teamLogoUrl: getTeamLogoUrl("ferrari")
  },
  {
    name: "Lewis Hamilton",
    nationality: "United Kingdom",
    team: "Ferrari",
    imageUrl: getDriverImageUrl("Lewis Hamilton"),
    flagUrl: getFlagUrl("United Kingdom"),
    teamLogoUrl: getTeamLogoUrl("ferrari")
  },
  // McLaren
  {
    name: "Lando Norris",
    nationality: "United Kingdom",
    team: "McLaren",
    imageUrl: getDriverImageUrl("Lando Norris"),
    flagUrl: getFlagUrl("United Kingdom"),
    teamLogoUrl: getTeamLogoUrl("mclaren")
  },
  {
    name: "Oscar Piastri",
    nationality: "Australia",
    team: "McLaren",
    imageUrl: getDriverImageUrl("Oscar Piastri"),
    flagUrl: getFlagUrl("Australia"),
    teamLogoUrl: getTeamLogoUrl("mclaren")
  },
  // Mercedes
  {
    name: "George Russell",
    nationality: "United Kingdom",
    team: "Mercedes",
    imageUrl: getDriverImageUrl("George Russell"),
    flagUrl: getFlagUrl("United Kingdom"),
    teamLogoUrl: getTeamLogoUrl("mercedes")
  },
  {
    name: "Kimi Antonelli",
    nationality: "Italy",
    team: "Mercedes",
    imageUrl: getDriverImageUrl("Andrea Kimi Antonelli"),
    flagUrl: getFlagUrl("Italy"),
    teamLogoUrl: getTeamLogoUrl("mercedes")
  },
  // Red Bull Racing
  {
    name: "Max Verstappen",
    nationality: "Netherlands",
    team: "Red Bull Racing",
    imageUrl: getDriverImageUrl("Max Verstappen"),
    flagUrl: getFlagUrl("Netherlands"),
    teamLogoUrl: getTeamLogoUrl("red-bull-racing")
  },
  {
    name: "Liam Lawson",
    nationality: "New Zealand",
    team: "Red Bull Racing",
    imageUrl: getDriverImageUrl("Liam Lawson"),
    flagUrl: getFlagUrl("New Zealand"),
    teamLogoUrl: getTeamLogoUrl("red-bull-racing")
  },
  // Aston Martin
  {
    name: "Fernando Alonso",
    nationality: "Spain",
    team: "Aston Martin",
    imageUrl: getDriverImageUrl("Fernando Alonso"),
    flagUrl: getFlagUrl("Spain"),
    teamLogoUrl: getTeamLogoUrl("aston-martin")
  },
  {
    name: "Lance Stroll",
    nationality: "Canada",
    team: "Aston Martin",
    imageUrl: getDriverImageUrl("Lance Stroll"),
    flagUrl: getFlagUrl("Canada"),
    teamLogoUrl: getTeamLogoUrl("aston-martin")
  },
  // Alpine
  {
    name: "Pierre Gasly",
    nationality: "France",
    team: "Alpine",
    imageUrl: getDriverImageUrl("Pierre Gasly"),
    flagUrl: getFlagUrl("France"),
    teamLogoUrl: getTeamLogoUrl("alpine")
  },
  {
    name: "Jack Doohan",
    nationality: "Australia",
    team: "Alpine",
    imageUrl: getDriverImageUrl("Jack Doohan"),
    flagUrl: getFlagUrl("Australia"),
    teamLogoUrl: getTeamLogoUrl("alpine")
  },
  // Williams
  {
    name: "Alexander Albon",
    nationality: "Thailand",
    team: "Williams",
    imageUrl: getDriverImageUrl("Alexander Albon"),
    flagUrl: getFlagUrl("Thailand"),
    teamLogoUrl: getTeamLogoUrl("williams")
  },
  {
    name: "Carlos Sainz",
    nationality: "Spain",
    team: "Williams",
    imageUrl: getDriverImageUrl("Carlos Sainz"),
    flagUrl: getFlagUrl("Spain"),
    teamLogoUrl: getTeamLogoUrl("williams")
  },
  // Racing Bulls
  {
    name: "Yuki Tsunoda",
    nationality: "Japan",
    team: "Racing Bulls",
    imageUrl: getDriverImageUrl("Yuki Tsunoda"),
    flagUrl: getFlagUrl("Japan"),
    teamLogoUrl: getTeamLogoUrl("racing-bulls")
  },
  {
    name: "Isack Hadjar",
    nationality: "France",
    team: "Racing Bulls",
    imageUrl: getDriverImageUrl("Isack Hadjar"),
    flagUrl: getFlagUrl("France"),
    teamLogoUrl: getTeamLogoUrl("racing-bulls")
  },
  // Haas
  {
    name: "Oliver Bearman",
    nationality: "United Kingdom",
    team: "Haas",
    imageUrl: getDriverImageUrl("Oliver Bearman"),
    flagUrl: getFlagUrl("United Kingdom"),
    teamLogoUrl: getTeamLogoUrl("haas")
  },
  {
    name: "Esteban Ocon",
    nationality: "France",
    team: "Haas",
    imageUrl: getDriverImageUrl("Esteban Ocon"),
    flagUrl: getFlagUrl("France"),
    teamLogoUrl: getTeamLogoUrl("haas")
  },
  // Kick Sauber
  {
    name: "Nico Hulkenberg",
    nationality: "Germany",
    team: "Kick Sauber",
    imageUrl: getDriverImageUrl("Nico Hulkenberg"),
    flagUrl: getFlagUrl("Germany"),
    teamLogoUrl: getTeamLogoUrl("kick-sauber")
  },
  {
    name: "Gabriel Bortoleto",
    nationality: "Brazil",
    team: "Kick Sauber",
    imageUrl: getDriverImageUrl("Gabriel Bortoleto"),
    flagUrl: getFlagUrl("Brazil"),
    teamLogoUrl: getTeamLogoUrl("kick-sauber")
  }
]

export default function DriversPage() {
  return (
    <div className="min-h-screen bg-background p-12">
      <h1 className="text-4xl font-bold mb-12 text-center">F1 Drivers 2025</h1>
      
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {drivers.map((driver) => (
            <div 
              key={driver.name} 
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-lg mb-1">{driver.name}</h2>
                    <p className="text-sm text-muted-foreground">{driver.team}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-7 relative">
                      <Image
                        src={driver.flagUrl}
                        alt={driver.nationality}
                        fill
                        className="object-cover rounded-md"
                        unoptimized
                      />
                    </div>
                    <div className="w-20 h-10 relative">
                      <Image
                        src={driver.teamLogoUrl}
                        alt={driver.team}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={driver.imageUrl}
                  alt={driver.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 