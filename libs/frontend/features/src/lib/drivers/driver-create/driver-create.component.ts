import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService, IDriverInfo } from '../driver.service';

@Component({
    selector: 'avans-nx-workshop-driver-create',
    templateUrl: './driver-create.component.html'
})
export class DriverCreateComponent {
    driver: IDriverInfo = {
        driverId: '',
        givenName: '',
        familyName: '',
        nationality: '',
        dateOfBirth: '',
        permanentNumber: ''
    };

    constructor(private driverService: DriverService, private router: Router) {}

    onSubmit(): void {
        if (this.driver.driverId && this.driver.givenName && this.driver.familyName) {
            this.driverService.createDriver(this.driver).subscribe(
                () => {
                    alert('Driver created successfully!');
                    this.router.navigate(['/drivers']);
                },
                (error) => {
                    console.error('Error creating driver:', error);
                    alert('Failed to create driver. Please try again.');
                }
            );
        } else {
            alert('Please fill in all required fields.');
        }
    }
}
