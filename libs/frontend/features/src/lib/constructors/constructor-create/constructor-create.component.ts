import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstructorService, IConstructorInfo } from '../constructor.service';

@Component({
    selector: 'app-constructor-create',
    templateUrl: './constructor-create.component.html'
})
export class ConstructorCreateComponent {
    constructorData: IConstructorInfo = {
        constructorId: '',
        name: '',
        nationality: '',
        url: ''
    };
    errorMessage: string = '';

    constructor(private constructorService: ConstructorService, private router: Router) {}

    onSubmit(): void {
        this.constructorService.createConstructor(this.constructorData).subscribe({
            next: () => {
                console.log('Constructor created successfully');
                this.router.navigate(['/constructors']);
            },
            error: (err) => {
                console.error('Error creating constructor:', err);
                this.errorMessage = 'Failed to create constructor. Please try again.';
            }
        });
    }
}
