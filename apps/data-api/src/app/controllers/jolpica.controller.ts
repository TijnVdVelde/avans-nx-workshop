import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JolpicaService } from '../services/jolpica.service';
import { SyncService } from '../services/sync.service';

@Controller('jolpica')
export class JolpicaController {
    constructor(
        @InjectModel('Driver') private readonly driverModel: Model<any>,
        @InjectModel('Constructor') private readonly constructorModel: Model<any>,
        private readonly jolpicaService: JolpicaService,
        private readonly syncService: SyncService
    ) {}

    // Drivers Endpoints
    @Get('drivers')
    async getDrivers() {
        const drivers = await this.driverModel.find();
        return drivers;
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

    @Delete('drivers/:id')
    async deleteDriver(@Param('id') id: string) {
        try {
            const deletedDriver = await this.driverModel.findByIdAndDelete(id);
            if (!deletedDriver) {
                throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
            }
            return { message: 'Driver deleted successfully' };
        } catch (error) {
            throw new HttpException(`Failed to delete driver: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Constructors Endpoints
    @Get('constructors')
    async getConstructors() {
        const constructors = await this.constructorModel.find();
        if (constructors.length > 0) {
            return constructors;
        }

        const apiResponse = await this.jolpicaService.fetchConstructors();
        return apiResponse;
    }

    @Post('constructors')
    async createConstructor(@Body() constructorData: any): Promise<any> {
        try {
            const newConstructor = new this.constructorModel(constructorData);
            return await newConstructor.save();
        } catch (error) {
            throw new HttpException(`Failed to create constructor: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('constructors/:id')
    async getConstructorById(@Param('id') id: string): Promise<any> {
        try {
            const sanitizedId = id.trim();
            const constructor = await this.constructorModel.findById(sanitizedId);
            if (!constructor) {
                throw new HttpException('Constructor not found', HttpStatus.NOT_FOUND);
            }
            return constructor;
        } catch (error) {
            throw new HttpException(`Failed to fetch constructor: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('constructors/:id')
    async updateConstructor(@Param('id') id: string, @Body() updateData: any): Promise<any> {
        try {
            const updatedConstructor = await this.constructorModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedConstructor) {
                throw new HttpException('Constructor not found', HttpStatus.NOT_FOUND);
            }
            return updatedConstructor;
        } catch (error) {
            throw new HttpException(`Failed to update constructor: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('constructors/:id')
    async deleteConstructor(@Param('id') id: string) {
        try {
            const deletedConstructor = await this.constructorModel.findByIdAndDelete(id);
            if (!deletedConstructor) {
                throw new HttpException('Constructor not found', HttpStatus.NOT_FOUND);
            }
            return { message: 'Constructor deleted successfully' };
        } catch (error) {
            throw new HttpException(`Failed to delete constructor: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Manual Sync Endpoints
    @Post('sync/drivers')
    @HttpCode(204)
    async syncDrivers() {
        try {
            await this.syncService.syncDrivers();
            return { message: 'Drivers synced successfully.' };
        } catch (error) {
            throw new HttpException(`Failed to sync drivers: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('sync/constructors')
    @HttpCode(204)
    async syncConstructors() {
        try {
            await this.syncService.syncConstructors();
            return { message: 'Constructors synced successfully.' };
        } catch (error) {
            throw new HttpException(`Failed to sync constructors: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
