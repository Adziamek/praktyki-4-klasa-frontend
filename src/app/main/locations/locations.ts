import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { LocationsService  } from '../../service/location-service/locations-service';
import { Location } from '../../service/location-service/location';
import { FormsModule } from '@angular/forms';
import { InputString } from '../../components/input-string/input-string';

@Component({
  imports: [FormsModule, InputString],
  selector: 'app-locations',
  styleUrl: './locations.css',
  templateUrl: './locations.html',
})
export class Locations {
    private locationService = inject(LocationsService);
    private changeDetector = inject(ChangeDetectorRef);
    isOpen = signal(false);

    locations: Location[] = [];

    code = '';
    warehouseCode = '';
    name = '';
    isActive = false;

    infoMessage = signal('');
    errorMessage = signal('');
    codeError = signal('');
    warehouseCodeError = signal('');
    nameError = signal('');

    constructor() {
        this.showLocations();
    }

    showLocations() {
        this.locationService.getAllLocations().subscribe({
            next: locations => {
                console.log(locations);
                this.locations = locations;
                this.changeDetector.detectChanges();
            },
            error: error => {
                console.error('Error:', error);
            }
        });
    }
    
    addLocation() {
        this.errorMessage.set('');
        this.infoMessage.set('');
        this.codeError.set('');
        this.warehouseCodeError.set('');
        this.nameError.set('');

        this.locationService.addLocation(
            this.code,
            this.warehouseCode,
            this.name,
            this.isActive
        ).subscribe({
            next: () => {
                this.infoMessage.set("Location added.");
                this.showLocations();
            },
            error: (error) => {
                if (error.status === 400 && error.error?.errors) {
                    const errors = error.error.errors;

                    this.codeError.set(errors.Code?.[0] ?? '');
                    this.warehouseCodeError.set(errors.WarehouseCode?.[0] ?? '');
                    this.nameError.set(errors.Name?.[0] ?? '');

                    return;
                }

                this.errorMessage.set(error.error?.detail ?? 'Signup failed. Please try again.');
            }
        })
    }
}
