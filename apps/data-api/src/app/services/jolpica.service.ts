import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JolpicaService {
    private readonly baseUrl = 'https://api.jolpi.ca/ergast/f1';

    async fetchDrivers() {
        try {
            const response = await axios.get(`${this.baseUrl}/2024/drivers.json`);
            console.log('Fetched drivers:', response.data); // Debugging log
            return response.data.MRData.DriverTable.Drivers; // Check API structure
        } catch (error) {
            console.error('Error fetching drivers:', error.message);
            throw new Error('Failed to fetch drivers from Ergast API');
        }
    }
}
