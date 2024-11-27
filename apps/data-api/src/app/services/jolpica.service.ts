import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JolpicaService {
    private readonly baseUrl = 'http://ergast.com/ergast/f1';

    async fetchDrivers() {
        try {
            const response = await axios.get('https://ergast.com/api/f1/2024/drivers.json');
            console.log('Fetched drivers:', response.data); // Debugging log
            return response.data.MRData.DriverTable.Drivers; // Check API structure
        } catch (error) {
            console.error('Error fetching drivers:', error.message);
            throw new Error('Failed to fetch drivers from Ergast API');
        }
    }

    async fetchRaces() {
        try {
            const response = await axios.get('https://ergast.com/api/f1/2024.json');
            console.log('Fetched races:', response.data); // Debugging log
            return response.data.MRData.RaceTable.Races; // Check API structure
        } catch (error) {
            console.error('Error fetching races:', error.message);
            throw new Error('Failed to fetch races from Ergast API');
        }
    }
}
