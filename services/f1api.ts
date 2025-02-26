import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

export interface Session {
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: string;
  meeting_name: string;
  circuit_key: number;
  circuit_short_name: string;
  country_name: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  session_id: number; // For compatibility with existing code
  date: string; // For compatibility with existing code
}

export interface Driver {
  driver_number: string;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_color: string;
  first_name: string;
  last_name: string;
  country_code: string;
  session_key: number;
}

export interface DriverStanding {
  position: number;
  points: number;
  driver_number: string;
  broadcast_name: string;
  team_name: string;
  session_key: number;
}

export interface ConstructorStanding {
  position: number;
  points: number;
  team_name: string;
  session_key: number;
}

class F1ApiService {
  async getSessions(): Promise<Session[]> {
    try {
      const response = await axios.get(`${BASE_URL}/sessions`);
      return response.data.map((session: any) => ({
        ...session,
        session_id: session.session_key,
        date: session.date_start
      }));
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }
  }

  async getDrivers(sessionKey?: number): Promise<Driver[]> {
    try {
      const url = sessionKey 
        ? `${BASE_URL}/drivers?session_key=${sessionKey}`
        : `${BASE_URL}/drivers`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      return [];
    }
  }

  async getDriverStandings(sessionKey: number): Promise<DriverStanding[]> {
    try {
      const response = await axios.get(`${BASE_URL}/driver_standings?session_key=${sessionKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching driver standings:', error);
      return [];
    }
  }

  async getConstructorStandings(sessionKey: number): Promise<ConstructorStanding[]> {
    try {
      const response = await axios.get(`${BASE_URL}/constructor_standings?session_key=${sessionKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching constructor standings:', error);
      return [];
    }
  }

  // Helper function to get the latest session
  async getLatestSession(): Promise<Session | null> {
    try {
      const sessions = await this.getSessions();
      if (sessions.length === 0) return null;
      
      // Sort sessions by date_start in descending order
      const sortedSessions = sessions.sort((a, b) => 
        new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
      );
      
      return sortedSessions[0];
    } catch (error) {
      console.error('Error getting latest session:', error);
      return null;
    }
  }
}

export const f1ApiService = new F1ApiService();
