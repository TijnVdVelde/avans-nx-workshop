import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JolpicaService {
    private readonly baseUrl = 'https://api.jolpi.ca/ergast/f1';

    async fetchDrivers() {
        try {
            const response = await axios.get(`${this.baseUrl}/2024/drivers.json`);
            return response.data.MRData.DriverTable.Drivers;
        } catch (error) {
            console.error('Error fetching drivers:', error.message);
            throw new Error('Failed to fetch drivers from Ergast API');
        }
    }

    async fetchConstructors() {
        try {
            const response = await axios.get(`${this.baseUrl}/2024/constructors.json`);
            return response.data.MRData.ConstructorTable.Constructors;
        } catch (error) {
            console.error('Error fetching constructors:', error.message);
            throw new Error('Failed to fetch constructors from Ergast API');
        }
    }
}
