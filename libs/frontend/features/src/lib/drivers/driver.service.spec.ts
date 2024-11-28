import { TestBed } from '@angular/core/testing';

import { DriverService } from './driver.service';

describe('DriverService', () => {
    let service: DriverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DriverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a list of drivers', () => {
        const drivers = service.getDrivers();
        expect(drivers.length).toBeGreaterThan(0);
    });

    it('should return a driver by ID', () => {
        const driver = service.getDriverById('1');
        expect(driver).toBeTruthy();
        expect(driver?.name).toEqual('Max Verstappen');
    });
});
