"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarPlus, Clock, Settings2, Calendar, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import raceData from "../data/race.json"

interface SessionTypes {
  [key: string]: boolean;
}

interface Session {
  type: string;
  date: string;
  time: string;
}

interface Race {
  name: string;
  sessions: Session[];
}

export default function Home() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("24")
  const [pastRaces, setPastRaces] = useState<"visible" | "hidden">("visible")
  const [selectedSessions, setSelectedSessions] = useState<SessionTypes>({
    "Free Practice 1": true,
    "Free Practice 2": true,
    "Free Practice 3": true,
    "Qualifying": true,
    "Sprint": true,
    "Grand Prix": true
  })
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false)

  const formatSessionDateTime = (date: string, time: string, timezone: string) => {
    const dateTime = new Date(`${date}T${time}:00Z`)
    return dateTime.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: timeFormat === "12"
    })
  }

  const isRacePast = (raceDate: string) => {
    const now = new Date()
    const race = new Date(raceDate)
    return race < now
  }

  const filteredRaces = raceData.races.filter(race => {
    if (pastRaces === "hidden") {
      return !isRacePast(race.sessions[race.sessions.length - 1].date)
    }
    return true
  })

  const generateICSContent = (selectedRaces: Race[]) => {
    const events = selectedRaces.flatMap(race => 
      race.sessions
        .map(session => {
          const startDate = new Date(`${session.date}T${session.time}:00Z`)
          const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000))
          
          const formatICSDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/g, "")
          }

          return `BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:F1: ${race.name} - ${session.type}
DESCRIPTION:Formula 1 ${session.type} at ${race.name}
END:VEVENT`
        })
    ).join("\n")

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//F1 Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Formula 1 2025 Calendar
X-WR-TIMEZONE:UTC
${events}
END:VCALENDAR`
  }

  const addToGoogleCalendar = (selectedRacesWithSessions: Race[]) => {
    const events = selectedRacesWithSessions.flatMap(race =>
      race.sessions.map(session => {
        const startDate = new Date(`${session.date}T${session.time}:00Z`)
        const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000))
        return {
          text: `F1: ${race.name} - ${session.type}`,
          details: `Formula 1 ${session.type} at ${race.name}`,
          dates: startDate.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/g, "") + "/" +
                 endDate.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/g, "")
        }
      })
    )

    // Open a new tab for each event
    events.forEach(event => {
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(event.text)}` +
        `&details=${encodeURIComponent(event.details)}` +
        `&dates=${event.dates}`
      
      window.open(calendarUrl, '_blank')
    })
  }

  const downloadICSFile = (selectedRacesWithSessions: Race[]) => {
    const icsContent = generateICSContent(selectedRacesWithSessions)
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    const selectedTypes = Object.entries(selectedSessions)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type.toLowerCase().replace(/\s+/g, '_'))
      .join('_')
    
    link.setAttribute('download', `f1-calendar-2025-${selectedTypes}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const addAllSelectedToCalendar = (type: 'google' | 'ics') => {
    const selectedRacesWithSessions = filteredRaces.map(race => ({
      ...race,
      sessions: race.sessions.filter(session => selectedSessions[session.type])
    })).filter(race => race.sessions.length > 0)

    if (type === 'google') {
      addToGoogleCalendar(selectedRacesWithSessions)
    } else {
      downloadICSFile(selectedRacesWithSessions)
    }
  }

  const addSingleSessionToCalendar = (raceName: string, session: Session) => {
    const raceWithSession = {
      name: raceName,
      sessions: [session]
    }
    
    // Open Google Calendar for single session
    addToGoogleCalendar([raceWithSession])
  }

  const now = new Date();

  const currentRaceIndex = filteredRaces.findIndex(race => {
    const raceStartDate = new Date(race.sessions[0].date);
    const raceEndDate = new Date(race.sessions[race.sessions.length - 1].date);
    return now >= raceStartDate && now <= raceEndDate;
  });

  const nextRaceIndex = filteredRaces.findIndex((race, index) => {
    const raceStartDate = new Date(race.sessions[0].date);
    return index > currentRaceIndex && raceStartDate > now;
  });

  return (
    <div className="min-h-screen bg-[#15151E] text-white font-formula1">
      <header className="bg-[#E10600] py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">F1® Calendar 2025</h1>
              <p className="text-lg mt-2 text-gray-100">Formula One Race Times and Dates</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Timezone Selector */}
              <div className="relative min-w-[200px]">
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                    <Clock className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#282836] border-[#3F3F4D] max-h-[300px]">
                    <div className="max-h-[300px] overflow-y-auto">
                      {Intl.supportedValuesOf("timeZone").map((zone) => (
                        <SelectItem 
                          key={zone} 
                          value={zone}
                          className="text-white hover:bg-[#32324A] focus:bg-[#32324A] focus:text-white"
                        >
                          {zone.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Settings Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="bg-white/10 hover:bg-white/20 transition-colors">
                    <Settings2 className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1F1F2D] border-[#3F3F4D] text-white">
                  <DialogHeader>
                    <DialogTitle>Display Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label>Time Format</Label>
                      <Select value={timeFormat} onValueChange={(v: "12" | "24") => setTimeFormat(v)}>
                        <SelectTrigger className="w-full bg-[#282836] border-[#3F3F4D] text-white">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#282836] border-[#3F3F4D]">
                          <SelectItem value="24" className="text-white hover:bg-[#32324A]">24-hour</SelectItem>
                          <SelectItem value="12" className="text-white hover:bg-[#32324A]">12-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Past Races</Label>
                      <Select value={pastRaces} onValueChange={(v: "visible" | "hidden") => setPastRaces(v)}>
                        <SelectTrigger className="w-full bg-[#282836] border-[#3F3F4D] text-white">
                          <SelectValue placeholder="Past races visibility" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#282836] border-[#3F3F4D]">
                          <SelectItem value="visible" className="text-white hover:bg-[#32324A]">Visible</SelectItem>
                          <SelectItem value="hidden" className="text-white hover:bg-[#32324A]">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Calendar Dialog */}
              <Dialog open={isCalendarDialogOpen} onOpenChange={setIsCalendarDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-[#E10600] hover:bg-white/90">
                    <CalendarPlus className="w-5 h-5 mr-2" />
                    Add to Calendar
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1F1F2D] border-[#3F3F4D] text-white">
                  <DialogHeader>
                    <DialogTitle>Add Sessions to Calendar</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-200 mb-4 block">Select sessions to add:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.keys(selectedSessions).map((sessionType) => (
                          <div key={sessionType} className="flex items-center space-x-2">
                            <Checkbox
                              id={sessionType}
                              checked={selectedSessions[sessionType]}
                              onCheckedChange={(checked) =>
                                setSelectedSessions(prev => ({
                                  ...prev,
                                  [sessionType]: checked === true
                                }))
                              }
                              className="border-[#3F3F4D] data-[state=checked]:bg-[#E10600] data-[state=checked]:border-[#E10600]"
                            />
                            <Label
                              htmlFor={sessionType}
                              className="text-sm font-medium text-gray-200 cursor-pointer hover:text-white transition-colors"
                            >
                              {sessionType}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCalendarDialogOpen(false)}
                        className="bg-transparent border-[#3F3F4D] text-white hover:bg-[#32324A]"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          addAllSelectedToCalendar('ics')
                          setIsCalendarDialogOpen(false)
                        }}
                        className="bg-[#32324A] hover:bg-[#3F3F4D] text-white"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Download ICS
                      </Button>
                      <Button
                        onClick={() => {
                          addAllSelectedToCalendar('google')
                          setIsCalendarDialogOpen(false)
                        }}
                        className="bg-[#E10600] hover:bg-[#B30500] text-white"
                      >
                        <CalendarPlus className="w-5 h-5 mr-2" />
                        Add to Google Calendar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          {filteredRaces.map((race, index) => (
            <Card key={index} className="bg-[#1F1F2D] border-none hover:bg-[#2A2A3D] transition-colors relative">
              <CardHeader>
                <CardTitle className="text-2xl text-[#E10600]">{race.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  Race weekend: {formatSessionDateTime(race.sessions[0].date, race.sessions[0].time, selectedTimezone)} - 
                  {formatSessionDateTime(race.sessions[4].date, race.sessions[4].time, selectedTimezone)}
                </CardDescription>
                {index === currentRaceIndex && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Ongoing</span>
                )}
                {index === nextRaceIndex && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Next</span>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {race.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="p-4 rounded-lg bg-[#282836] hover:bg-[#32324A] transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{session.type}</h3>
                        <button
                          onClick={() => addSingleSessionToCalendar(race.name, session)}
                          className="text-[#E10600] hover:text-white transition-colors"
                        >
                          <CalendarPlus className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-400">
                        {formatSessionDateTime(session.date, session.time, selectedTimezone)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}