import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructorService, IConstructorInfo } from '../constructor.service';

@Component({
    selector: 'app-constructor-edit',
    templateUrl: './constructor-edit.component.html'
})
export class ConstructorEditComponent implements OnInit {
    constructorData: IConstructorInfo | undefined;
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private constructorService: ConstructorService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')?.trim();
        if (id) {
            this.constructorService.getConstructorById(id).subscribe({
                next: (data) => {
                    console.log('Fetched constructor:', data);
                    this.constructorData = data;
                },
                error: (err) => {
                    console.error('Error fetching constructor:', err);
                    this.errorMessage = 'Failed to load constructor details.';
                }
            });
        } else {
            this.errorMessage = 'Invalid constructor ID.';
        }
    }

    onSubmit(): void {
        if (!this.constructorData || !this.constructorData._id) {
            this.errorMessage = 'Invalid constructor data.';
            return;
        }

        this.constructorService.updateConstructor(this.constructorData).subscribe({
            next: () => {
                console.log('Constructor updated successfully');
                this.router.navigate(['/constructors']);
            },
            error: (err) => {
                console.error('Error updating constructor:', err);
                this.errorMessage = 'Failed to update constructor.';
            }
        });
    }
}
