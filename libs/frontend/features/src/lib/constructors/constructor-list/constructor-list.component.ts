import { Component, OnInit } from '@angular/core';
import { ConstructorService, IConstructorInfo } from '../constructor.service';

@Component({
    selector: 'app-constructor-list',
    templateUrl: './constructor-list.component.html'
})
export class ConstructorListComponent implements OnInit {
    constructors: IConstructorInfo[] = [];
    errorMessage = '';

    constructor(private constructorService: ConstructorService) {}

    ngOnInit(): void {
        this.constructorService.getConstructors().subscribe({
            next: (data) => {
                if (Array.isArray(data)) {
                    this.constructors = data; // Assign the array to the component property
                } else {
                    console.error('Unexpected response:', data);
                    this.errorMessage = 'Invalid data format received from the backend.';
                }
            },
            error: (err) => {
                console.error('Error fetching constructors:', err);
                this.errorMessage = 'Failed to load constructors.';
            }
        });
    }
}
