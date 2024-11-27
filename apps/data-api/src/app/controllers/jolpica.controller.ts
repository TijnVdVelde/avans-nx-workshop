import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('jolpica')
export class JolpicaController {
    constructor(@InjectModel('Driver') private readonly driverModel: Model<any>) {}

    @Get('drivers')
    async getDrivers() {
        const drivers = await this.driverModel.find(); // Fetch all drivers from MongoDB
        return {
            results: drivers, // Simplified response
            info: {
                version: '1.0',
                type: 'list',
                count: drivers.length
            }
        };
    }
}
