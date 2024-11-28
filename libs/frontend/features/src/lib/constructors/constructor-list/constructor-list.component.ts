import { Component, OnInit } from '@angular/core';
import { ConstructorService, IConstructorInfo } from '../constructor.service';

@Component({
    selector: 'app-constructor-list',
    templateUrl: './constructor-list.component.html'
})
export class ConstructorListComponent implements OnInit {
    constructors: IConstructorInfo[] = [];
    errorMessage: string = '';

    constructor(private constructorService: ConstructorService) {}

    ngOnInit(): void {
        this.constructorService.getConstructors().subscribe({
            next: (data) => {
                if (Array.isArray(data)) {
                    this.constructors = data;
                } else {
                    console.error('Unexpected response:', data);
                    this.errorMessage = 'Invalid data format received.';
                }
            },
            error: (err) => {
                console.error('Error fetching constructors:', err);
                this.errorMessage = 'Failed to load constructors.';
            }
        });
    }

    deleteConstructor(constructor: IConstructorInfo): void {
        if (!constructor._id) {
            console.error('Constructor ID (_id) is undefined:', constructor);
            this.errorMessage = 'Unable to delete constructor. Invalid ID.';
            return;
        }

        if (confirm(`Are you sure you want to delete ${constructor.name}?`)) {
            this.constructorService.deleteConstructor(constructor._id).subscribe({
                next: () => {
                    // Remove the constructor from the list after successful deletion
                    this.constructors = this.constructors.filter((c) => c._id !== constructor._id);
                    console.log(`${constructor.name} deleted successfully.`);
                },
                error: (err) => {
                    console.error('Error deleting constructor:', err);
                    this.errorMessage = 'Failed to delete constructor.';
                }
            });
        }
    }
}
