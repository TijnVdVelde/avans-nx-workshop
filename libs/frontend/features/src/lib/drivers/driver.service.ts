import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface IDriverInfo {
    _id?: string;
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
    private apiUrl = 'http://localhost:3000/api/jolpica/drivers';

    constructor(private http: HttpClient) {}

    getDrivers(): Observable<IDriverInfo[]> {
        return this.http.get<{ results: IDriverInfo[] }>(this.apiUrl).pipe(
            map((response) => response.results)
        );
    }

    getDriverById(driverId: string): Observable<IDriverInfo> {
        return this.http.get<{ results: IDriverInfo }>(`${this.apiUrl}/${driverId}`).pipe(
            map((response) => {
                console.log('Driver fetched from API:', response.results);
                return response.results;
            })
        );
    }

    createDriver(driver: IDriverInfo): Observable<IDriverInfo> {
        return this.http.post<IDriverInfo>(this.apiUrl, driver);
    }

    updateDriver(driver: IDriverInfo): Observable<IDriverInfo> {
        return this.http.put<IDriverInfo>(
            `${this.apiUrl}/${driver._id}`,
            driver
        );
    }

    deleteDriver(driverId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${driverId}`);
    }
}
