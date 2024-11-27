import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SyncService {
    private readonly logger = new Logger(SyncService.name);
    private readonly ergastApiUrl = 'https://ergast.com/api/f1/2024/drivers.json';

    constructor(
        @InjectModel('Driver') private readonly driverModel: Model<any> // Replace with your Driver schema
    ) {}

    async syncDrivers(): Promise<void> {
        try {
            // Fetch drivers from the Ergast API
            const response = await axios.get(this.ergastApiUrl);
            const drivers = response.data?.MRData?.DriverTable?.Drivers;

            if (drivers && drivers.length > 0) {
                // Clear existing drivers in the collection
                await this.driverModel.deleteMany({});
                // Insert new drivers into MongoDB
                await this.driverModel.insertMany(drivers);
                this.logger.log(`Successfully synced ${drivers.length} drivers from Ergast API.`);
            } else {
                this.logger.warn('No drivers found in the response from Ergast API.');
            }
        } catch (error) {
            this.logger.error('Error syncing drivers from Ergast API:', error.message);
        }
    }
}
