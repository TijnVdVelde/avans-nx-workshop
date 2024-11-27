import { Component, OnInit } from '@angular/core';
import { DriverService, IDriverInfo } from '../driver.service';

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html'
})
export class DriverListComponent implements OnInit {
    drivers: IDriverInfo[] = []; // Initialize as an empty array

    constructor(private driverService: DriverService) {}

    ngOnInit(): void {
        this.driverService.getDrivers().subscribe(
            (data) => {
                console.log('Drivers data:', data); // Log the extracted array
                this.drivers = data; // Assign the array to drivers
            },
            (error) => {
                console.error('Error fetching drivers:', error);
            }
        );
    }
}
