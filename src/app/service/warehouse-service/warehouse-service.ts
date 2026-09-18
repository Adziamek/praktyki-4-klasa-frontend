import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse } from './warehouse';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    private api = `${environment.apiWarehouses}`;
    
    constructor(private http: HttpClient) { }

    getAllWarehouses(): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(`${this.api}`);
    }

    getWarehouseById(id: number): Observable<Warehouse> {
        return this.http.get<Warehouse>(`${this.api}/${id}`);
    }

    addWarehouse(
        code: string,
        name: string,
        description: string,
        isActive: boolean
    ) {
        return this.http.post(`${this.api}`, {
            code,
            name,
            description,
            isActive
        })
    }

    editWarehouse(
        id: number,
        code: string,
        name: string,
        description: string,
        isActive: boolean
    ) {
        return this.http.put(`${this.api}/${id}`, {
            code,
            name,
            description,
            isActive
        })
    }

    deleteWarehouse(id: number) {
        return this.http.delete(`${this.api}/${id}`);
    }
}