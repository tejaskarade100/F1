"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Sample data - In a real app, this would come from an API
const races = [
  {
    id: 1,
    name: "FORMULA 1 LOUIS VUITTON AUSTRALIAN GRAND PRIX 2025",
    circuit: "Albert Park Circuit",
    location: "Melbourne",
    country: "Australia",
    date: "14-16 MAR 2025",
    flag: "🇦🇺",
    sessions: {
      practice1: "2025-03-14T03:30:00Z",
      practice2: "2025-03-14T07:00:00Z",
      practice3: "2025-03-15T03:30:00Z",
      qualifying: "2025-03-15T07:00:00Z",
      race: "2025-03-16T06:00:00Z",
    },
  },
  // Add more races...
]

const teams = [
  {
    id: 1,
    name: "Oracle Red Bull Racing",
    car: "RB20",
    logo: "/redbull-logo.svg",
    color: "#3671C6",
    drivers: [
      {
        name: "Max Verstappen",
        number: "1",
        country: "🇳🇱",
        points: 575,
      },
      {
        name: "Sergio Perez",
        number: "11",
        country: "🇲🇽",
        points: 285,
      },
    ],
  },
  // Add more teams...
]

export default function F1Calendar() {
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  return (
    <div className="min-h-screen bg-[#15151E] text-white font-formula1">
      <header className="bg-[#E10600] py-6">
        <div className="container">
          <h1 className="text-4xl font-bold">F1® Calendar 2025</h1>
          <p className="text-lg mt-2 text-gray-100">Formula One Race Times and Dates</p>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="calendar" className="space-y-8">
          <TabsList>
            <TabsTrigger value="calendar">CALENDAR</TabsTrigger>
            <TabsTrigger value="teams">TEAMS & DRIVERS</TabsTrigger>
            <TabsTrigger value="standings">STANDINGS</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Clock className="text-[#E10600]" />
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {Intl.supportedValuesOf("timeZone").map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {races.map((race) => (
                <Card key={race.id} className="bg-[#1F1F2D] border-none">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{race.flag}</span>
                          <CardTitle>{race.name}</CardTitle>
                        </div>
                        <CardDescription className="text-gray-400 flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {race.circuit} - {race.location}
                          </span>
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                        onClick={() => addToGoogleCalendar(race)}
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>Add to Calendar</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(race.sessions).map(([session, time]) => (
                        <div key={session} className="bg-[#15151E] p-4 rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">{session.toUpperCase()}</div>
                          <div className="text-lg font-bold">{formatSessionTime(time, selectedTimezone)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card key={team.id} className="bg-[#1F1F2D] border-none overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: team.color }} />
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={team.logo || "/placeholder.svg"}
                        alt={team.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <CardTitle>{team.name}</CardTitle>
                        <CardDescription className="text-gray-400">{team.car}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {team.drivers.map((driver) => (
                        <div key={driver.number} className="bg-[#15151E] p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xl">{driver.country}</span>
                            <span className="font-bold">{driver.name}</span>
                          </div>
                          <div className="text-[#E10600] text-3xl font-bold">{driver.number}</div>
                          <div className="text-sm text-gray-400 mt-2">{driver.points} PTS</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standings" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#1F1F2D] border-none">
                <CardHeader>
                  <CardTitle>Driver Standings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teams
                      .flatMap((team) => team.drivers)
                      .sort((a, b) => b.points - a.points)
                      .map((driver, index) => (
                        <div
                          key={driver.number}
                          className="flex items-center justify-between bg-[#15151E] p-4 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold">{index + 1}</span>
                            <span className="text-xl">{driver.country}</span>
                            <span>{driver.name}</span>
                          </div>
                          <div className="font-bold">{driver.points} PTS</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F2D] border-none">
                <CardHeader>
                  <CardTitle>Constructor Standings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teams
                      .map((team) => ({
                        ...team,
                        points: team.drivers.reduce((sum, driver) => sum + driver.points, 0),
                      }))
                      .sort((a, b) => b.points - a.points)
                      .map((team, index) => (
                        <div key={team.id} className="flex items-center justify-between bg-[#15151E] p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold">{index + 1}</span>
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={team.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span>{team.name}</span>
                          </div>
                          <div className="font-bold">{team.points} PTS</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function formatSessionTime(time: string, timezone: string) {
  return new Date(time).toLocaleString("en-US", {
    timeZone: timezone,
    dateStyle: "short",
    timeStyle: "short",
  })
}

function addToGoogleCalendar(race: (typeof races)[0]) {
  const text = `F1: ${race.name}`
  const details = `Formula 1 race at ${race.circuit}, ${race.location}`
  const dates = new Date(race.sessions.race)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/g, "")

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    text,
  )}&details=${encodeURIComponent(details)}&dates=${dates}/${dates}`

  window.open(url, "_blank")
}

