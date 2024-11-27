import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface IDriverInfo {
    _id: string;
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
    dateOfBirth: string;
    permanentNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    private apiUrl = 'http://localhost:3000/api/jolpica/drivers'; // Backend endpoint

    constructor(private http: HttpClient) {}

    getDrivers(): Observable<IDriverInfo[]> {
        return this.http.get<{ results: { results: IDriverInfo[] } }>(this.apiUrl).pipe(
            map((response) => response.results.results) // Extract the inner `results` array
        );
    }
}
