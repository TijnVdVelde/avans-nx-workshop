import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SyncService {
    private readonly logger = new Logger(SyncService.name);
    private readonly driversApiUrl = 'https://ergast.com/api/f1/2024/drivers.json';
    private readonly constructorsApiUrl = 'https://ergast.com/api/f1/2024/constructors.json';

    constructor(
        @InjectModel('Driver') private readonly driverModel: Model<any>,
        @InjectModel('Constructor') private readonly constructorModel: Model<any>
    ) {}

    async syncDrivers(): Promise<void> {
        try {
            const response = await axios.get(this.driversApiUrl);
            const drivers = response.data?.MRData?.DriverTable?.Drivers;

            if (drivers && drivers.length > 0) {
                await this.driverModel.deleteMany({});
                await this.driverModel.insertMany(drivers);
                this.logger.log(`Successfully synced ${drivers.length} drivers from Ergast API.`);
            } else {
                this.logger.warn('No drivers found in the response from Ergast API.');
            }
        } catch (error) {
            this.logger.error('Error syncing drivers from Ergast API:', error.message);
        }
    }

    async syncConstructors(): Promise<void> {
        try {
            const response = await axios.get(this.constructorsApiUrl);
            const constructors = response.data?.MRData?.ConstructorTable?.Constructors;

            if (constructors && constructors.length > 0) {
                await this.constructorModel.deleteMany({});
                await this.constructorModel.insertMany(constructors);
                this.logger.log(`Successfully synced ${constructors.length} constructors from Ergast API.`);
            } else {
                this.logger.warn('No constructors found in the response from Ergast API.');
            }
        } catch (error) {
            this.logger.error('Error syncing constructors from Ergast API:', error.message);
        }
    }
}
