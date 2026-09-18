import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { LocationsService  } from '../../service/location-service/locations-service';
import { Location } from '../../service/location-service/location';
import { FormsModule } from '@angular/forms';
import { InputString } from '../../components/input-string/input-string';
import { SubmitButton } from '../../components/submit-button/submit-button';
import { InfoErrorBox } from '../../components/info-error-box/info-error-box';
import { Warehouse } from '../../service/warehouse-service/warehouse';
import { WarehouseService } from '../../service/warehouse-service/warehouse-service';

@Component({
  imports: [FormsModule, InputString, SubmitButton, InfoErrorBox],
  selector: 'app-locations',
  styleUrl: './locations.css',
  templateUrl: './locations.html',
})
export class Locations {
    private locationService = inject(LocationsService);
    private changeDetector = inject(ChangeDetectorRef);
    private warehouseService = inject(WarehouseService);

    isSideOpen = signal(false);
    isEditOpen = signal(false);
    isDeleteOpen = signal(false);

    locations: Location[] = [];
    warehouses: Warehouse[] = [];

    id = -1;

    // For adding
    addCode = '';
    addWarehouseCode: string | null = null;
    addName = '';
    addIsActive = false;

    // For editing
    editCode = '';
    editWarehouseCode = '';
    editName = '';
    editIsActive = false;

    infoMessage = signal('');
    errorMessage = signal('');
    codeError = signal('');
    warehouseCodeError = signal('');
    nameError = signal('');

    constructor() {
        this.showLocations();
        
        this.warehouseService.getAllWarehouses().subscribe({
            next: warehouses => {
                this.warehouses = warehouses;
            },
            error: error => {
                console.error('Error:', error);
            }
        });
    }

    openCloseSide() {
        this.isSideOpen.update(value => !value);

        if (!this.isSideOpen())
            this.clearMessages();
    }

    openEdit(id: number) {
        let location = this.locations.find(x => x.id === id);

        if (location == null)
            return;

        this.id = id;
        this.editCode = location.code;
        this.editWarehouseCode = location.warehouseCode;
        this.editName = location.name;
        this.editIsActive = location.isActive;

        this.clearMessages();

        if (this.isSideOpen())
            this.openCloseSide();

        this.isEditOpen.set(true);
    }

    closeEdit() {
        this.isEditOpen.set(false);
        this.clearMessages();
    }

    openDelete(id: number) {
        this.clearMessages();

        this.id = id;
        this.isDeleteOpen.set(true);

        this.closeEdit();
    }

    closeDelete() {
        this.id = -1;
        this.isDeleteOpen.set(false);
        this.clearMessages();
    }

    clearMessages() {
        this.infoMessage.set('');
        this.errorMessage.set('');
        this.codeError.set('');
        this.warehouseCodeError.set('');
        this.nameError.set('');
     }

    showLocations() {
        this.locationService.getAllLocations().subscribe({
            next: locations => {
                this.locations = locations;
                this.changeDetector.detectChanges();
            },
            error: error => {
                console.error('Error:', error);
            }
        });
    }
    
    addLocation() {
        this.clearMessages();

        this.locationService.addLocation(
            this.addCode,
            this.addWarehouseCode,
            this.addName,
            this.addIsActive
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

                this.errorMessage.set(error.error?.detail ?? 'Adding failed. Please try again.');
            }
        })
    }

    editLocation() {
        this.clearMessages();

        this.locationService.editLocation(
            this.id,
            this.editCode,
            this.editWarehouseCode,
            this.editName,
            this.editIsActive
        ).subscribe({
            next: () => {
                this.infoMessage.set("Location changed.");
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

                this.errorMessage.set(error.error?.detail ?? 'Editing failed. Please try again.');
            }
        })
    }

    deleteLocation() {
        this.locationService.deleteLocation(this.id).subscribe({
            next: () => {
                this.infoMessage.set("Location deleted.");
                this.showLocations();
            },
            error: (error) => {
                this.errorMessage.set(error.error?.detail ?? 'Deleting failed. Please try again.');
            }
        })
    }
}
