import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverListComponent } from './driver-list.component';

describe('DriverListComponent', () => {
    let component: DriverListComponent;
    let fixture: ComponentFixture<DriverListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DriverListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DriverListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have drivers defined after initialization', () => {
        component.ngOnInit();
        expect(component.drivers).toBeDefined();
    });
});
