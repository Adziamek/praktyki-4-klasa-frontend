import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';
import { LocationDto } from './locationDto';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private api = `${environment.apiLocations}`;

    constructor(private http: HttpClient) { }

    getAllLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.api}`);
    }

    getLocationById(id: number): Observable<Location> {
        return this.http.get<Location>(`${this.api}/${id}`);
    }

    addLocation(
      locationDto: LocationDto
    ) {
      return this.http.post(`${this.api}`, locationDto);
    }

    editLocation(
      id: number,
      locationDto: LocationDto
    ) {
      return this.http.put(`${this.api}/${id}`, locationDto);
    }

    deleteLocation(id: number) {
      return this.http.delete(`${this.api}/${id}`);
    }
}
