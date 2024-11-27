import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverService, IDriverInfo } from '../driver.service';

@Component({
    selector: 'avans-nx-workshop-driver-list',
    templateUrl: './driver-list.component.html'
})
export class DriverListComponent implements OnInit, OnDestroy {
    drivers: IDriverInfo[] = []; // Initialize as an empty array
    sub?: Subscription;

    constructor(private driverService: DriverService) {}

    ngOnInit(): void {
        this.sub = this.driverService.getDrivers().subscribe({
            next: (drivers) => {
                this.drivers = drivers;
            },
            error: (err) => {
                console.error('Error fetching drivers:', err);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
