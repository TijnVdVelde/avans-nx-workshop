import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('jolpica')
export class JolpicaController {
    constructor(@InjectModel('Driver') private readonly driverModel: Model<any>) {}

    @Get('drivers')
    async getDrivers() {
        const drivers = await this.driverModel.find();
        return drivers; // Return a flat array of drivers
    }

    @Get('drivers/:id')
    async getDriverById(@Param('id') id: string) {
        const driver = await this.driverModel.findOne({ driverId: id });
        if (!driver) {
            throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
        }
        return driver;
    }

    @Post('drivers')
    async createDriver(@Body() driverData: any): Promise<any> {
        try {
            const newDriver = new this.driverModel(driverData);
            return await newDriver.save();
        } catch (error) {
            throw new HttpException(`Failed to create driver: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('drivers/:id')
    async updateDriver(@Param('id') id: string, @Body() updateData: any) {
        try {
            const updatedDriver = await this.driverModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedDriver) {
                throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
            }
            return updatedDriver;
        } catch (error) {
            throw new HttpException(`Failed to update driver: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
