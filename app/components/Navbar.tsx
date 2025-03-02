"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#E10600] text-white">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex justify-between h-[60px] items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="https://media.formula1.com/image/upload/f_auto,c_limit,w_285,q_auto/f_auto/q_auto/fom-website/etc/designs/fom-website/images/F1_75_Logo"
                alt="F1 Logo"
                width={195}
                height={90}
                className="mr-6"
              />
            </Link>
            
            <div className="flex space-x-6">
              {/* <Link 
                href="/latest"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/latest' 
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Latest <ChevronDown className="ml-1 h-4 w-4" />
              </Link> */}
              
              {/* <Link 
                href="/video"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/video'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Video
              </Link> */}

              {/* <Link 
                href="/f1-unlocked"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/f1-unlocked'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                F1 Unlocked
              </Link> */}

              <Link 
                href="/schedule"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/schedule'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Schedule <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              <Link 
                href="/results"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/results'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Results <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              <Link 
                href="/teams-and-drivers/drivers"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  // pathname.includes('/teams-and-drivers/drivers')
                  pathname === '/teams-and-drivers/drivers'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Drivers <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              <Link 
                href="/teams"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/teams'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Teams <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              {/* <Link 
                href="/gaming"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/gaming'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Gaming <ChevronDown className="ml-1 h-4 w-4" />
              </Link> */}

              <Link 
                href="/live-timing"
                className={`flex items-center h-[60px] px-2 text-[14px] font-medium border-b-[3px] ${
                  pathname === '/live-timing'
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                Live Timing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 