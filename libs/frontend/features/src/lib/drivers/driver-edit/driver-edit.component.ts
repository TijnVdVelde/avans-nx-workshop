import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService, IDriverInfo } from '../driver.service';

@Component({
    selector: 'app-driver-edit',
    templateUrl: './driver-edit.component.html'
})
export class DriverEditComponent implements OnInit {
    driver: IDriverInfo | null = null;

    constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const driverId = this.route.snapshot.paramMap.get('id');
        console.log('Driver ID from route:', driverId);

        if (driverId) {
            this.driverService.getDriverById(driverId).subscribe(
                (driver) => {
                    console.log('Fetched driver:', driver);
                    this.driver = driver;
                },
                (error) => {
                    console.error('Error fetching driver:', error);
                    alert('Failed to fetch driver details.');
                }
            );
        }
    }

    onSubmit(): void {
        if (this.driver) {
            console.log('Submitting updated driver:', this.driver);
            this.driverService.updateDriver(this.driver).subscribe(
                () => {
                    alert('Driver updated successfully!');
                    this.router.navigate(['/drivers']);
                },
                (error) => {
                    console.error('Error updating driver:', error);
                    alert('Failed to update driver. Please try again.');
                }
            );
        }
    }
}
