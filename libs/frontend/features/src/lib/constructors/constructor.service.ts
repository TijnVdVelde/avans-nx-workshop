import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface IConstructorInfo {
    _id?: string;
    constructorId: string;
    name: string;
    nationality: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConstructorService {
    private apiUrl = 'http://localhost:3000/api/jolpica/constructors';

    constructor(private http: HttpClient) {}

    getConstructors(): Observable<IConstructorInfo[]> {
        return this.http.get<{ results: IConstructorInfo[] }>(this.apiUrl).pipe(
            map((response) => response.results || []) // Extract results or return an empty array
        );
    }

    createConstructor(constructor: IConstructorInfo): Observable<IConstructorInfo> {
        return this.http.post<IConstructorInfo>(this.apiUrl, constructor);
    }

    deleteConstructor(constructorId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${constructorId}`);
    }
}
