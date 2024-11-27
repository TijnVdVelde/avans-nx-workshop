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
                this.drivers = data; // Populate drivers array
            },
            (error) => {
                console.error('Error fetching drivers:', error);
            }
        );
    }

    deleteDriver(driver: IDriverInfo): void {
        if (confirm(`Are you sure you want to delete ${driver.givenName} ${driver.familyName}?`)) {
            this.driverService.deleteDriver(driver._id!).subscribe(
                () => {
                    this.drivers = this.drivers.filter((d) => d._id !== driver._id); // Remove driver from array
                    alert('Driver deleted successfully!');
                },
                (error) => {
                    console.error('Error deleting driver:', error);
                    alert('Failed to delete driver. Please try again.');
                }
            );
        }
    }
}
