"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { f1ApiService, type Session, type Driver, type DriverStanding, type ConstructorStanding } from "@/services/f1api"

export default function F1Calendar() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [driverStandings, setDriverStandings] = useState<DriverStanding[]>([])
  const [constructorStandings, setConstructorStandings] = useState<ConstructorStanding[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  useEffect(() => {
    const fetchF1Data = async () => {
      try {
        setLoading(true)
        const [sessionsData, driversData] = await Promise.all([
          f1ApiService.getSessions(),
          f1ApiService.getDrivers()
        ])

        setSessions(sessionsData)
        setDrivers(driversData)

        // Get latest session for standings
        const latestSession = await f1ApiService.getLatestSession()
        if (latestSession) {
          const [driverStandingsData, constructorStandingsData] = await Promise.all([
            f1ApiService.getDriverStandings(latestSession.session_id),
            f1ApiService.getConstructorStandings(latestSession.session_id)
          ])
          setDriverStandings(driverStandingsData)
          setConstructorStandings(constructorStandingsData)
        }
      } catch (error) {
        console.error('Error fetching F1 data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchF1Data()
  }, [])

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
            {loading ? (
              <div className="text-center py-8">
                <p>Loading F1 calendar data...</p>
              </div>
            ) : (
              <>
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
                  {sessions.map((session) => (
                    <Card key={session.session_id} className="bg-[#1F1F2D] border-none">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-2">{session.meeting_name}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{session.circuit_short_name}, {session.country_name}</span>
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2"
                            onClick={() => addToGoogleCalendar(session)}
                          >
                            <CalendarPlus className="w-4 h-4" />
                            <span>Add to Calendar</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <h4 className="font-semibold">{session.session_type}</h4>
                              <p className="text-sm text-gray-400">
                                {formatSessionTime(session.date, selectedTimezone)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="teams" className="space-y-8">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading teams and drivers data...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {drivers.reduce((teams, driver) => {
                  const existingTeam = teams.find(t => t.name === driver.team_name);
                  if (!existingTeam) {
                    teams.push({
                      name: driver.team_name,
                      color: driver.team_color,
                      drivers: [driver]
                    });
                  } else {
                    existingTeam.drivers.push(driver);
                  }
                  return teams;
                }, [] as { name: string; color: string; drivers: Driver[] }[]).map((team) => (
                  <Card key={team.name} className="bg-[#1F1F2D] border-none">
                    <CardHeader>
                      <CardTitle className="text-xl" style={{ color: team.color }}>{team.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {team.drivers.map((driver) => (
                          <div key={driver.driver_number} className="flex items-center space-x-4">
                            <div className="text-2xl font-bold" style={{ color: team.color }}>
                              {driver.driver_number}
                            </div>
                            <div>
                              <h4 className="font-semibold">{driver.broadcast_name}</h4>
                              <p className="text-sm text-gray-400">{driver.country_code}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="standings" className="space-y-8">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading standings data...</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-[#1F1F2D] border-none">
                  <CardHeader>
                    <CardTitle>Driver Standings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {driverStandings.map((standing) => (
                        <div key={standing.driver_number} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 text-center font-bold">{standing.position}</div>
                            <div>
                              <h4 className="font-semibold">{standing.broadcast_name}</h4>
                              <p className="text-sm text-gray-400">{standing.team_name}</p>
                            </div>
                          </div>
                          <div className="font-bold">{standing.points} PTS</div>
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
                      {constructorStandings.map((standing) => (
                        <div key={standing.team_name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 text-center font-bold">{standing.position}</div>
                            <div>
                              <h4 className="font-semibold">{standing.team_name}</h4>
                            </div>
                          </div>
                          <div className="font-bold">{standing.points} PTS</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function formatSessionTime(time: string, timezone: string) {
  return new Date(time).toLocaleString('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function addToGoogleCalendar(session: Session) {
  const text = `F1: ${session.meeting_name}`
  const details = `Formula 1 race at ${session.circuit_short_name}, ${session.country_name}`
  const dates = new Date(session.date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/g, "")

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&details=${encodeURIComponent(details)}&dates=${dates}/${dates}`

  window.open(url, "_blank")
}
