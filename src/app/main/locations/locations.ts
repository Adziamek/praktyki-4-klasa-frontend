import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { LocationsService  } from '../../service/location-service/locations.service';
import { Location } from '../../service/location-service/location';
import { FormsModule } from '@angular/forms';
import { InputString } from '../../components/input-string/input-string';
import { InputSelect} from '../../components/input-select/input-select';
import { SubmitButton } from '../../components/submit-button/submit-button';
import { InfoErrorBox } from '../../components/info-error-box/info-error-box';
import { Warehouse } from '../../service/warehouse-service/warehouse';
import { WarehouseService } from '../../service/warehouse-service/warehouse-service';
import { LocationDto } from '../../service/location-service/locationDto';
import { ErrorService } from '../../service/error-service/error.service';

@Component({
  imports: [FormsModule, InputString,InputSelect, SubmitButton, InfoErrorBox],
  selector: 'app-locations',
  styleUrl: './locations.css',
  templateUrl: './locations.html',
})
export class Locations implements OnInit {
    private locationService = inject(LocationsService);
    private changeDetector = inject(ChangeDetectorRef);
    private warehouseService = inject(WarehouseService);
    private errorService = inject(ErrorService);

    isSideOpen = signal(false);
    isEditOpen = signal(false);
    isDeleteOpen = signal(false);

    locations: Location[] = [];
    warehouses: Warehouse[] = [];

    addLocationData: LocationDto = {
        code: '',
        warehouseCode: null,
        name: '',
        isActive: false
    }

    id = -1;
    editLocationData: LocationDto = {
        code: '',
        warehouseCode: null,
        name: '',
        isActive: false
    };

    infoMessage = signal('');
    errorMessage = signal('');
    fieldErrors = signal<Record<string, string>>({});

    ngOnInit(): void {
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
        this.editLocationData = {
            code: location.code,
            warehouseCode: location.warehouseCode,
            name: location.name,
            isActive: location.isActive
        };

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
        this.fieldErrors.set({});
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
            this.addLocationData
        ).subscribe({
            next: () => {
                this.infoMessage.set("Location added.");
                this.showLocations();
            },
            error: (error) => {
                this.fieldErrors.set(this.errorService.getFieldErrors(error));
                this.errorMessage.set(this.errorService.getDetail(error, 'Adding failed. Please try again.'));
            }
        })
    }

    editLocation() {
        this.clearMessages();

        this.locationService.editLocation(
            this.id,
            this.editLocationData
        ).subscribe({
            next: () => {
                this.infoMessage.set("Location changed.");
                this.showLocations();
            },
            error: (error) => {
                this.fieldErrors.set(this.errorService.getFieldErrors(error));
                this.errorMessage.set(this.errorService.getDetail(error, 'Editing failed. Please try again.'));
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
                this.errorMessage.set(this.errorService.getDetail(error, 'Deleting failed. Please try again.'));
            }
        })
    }
}
