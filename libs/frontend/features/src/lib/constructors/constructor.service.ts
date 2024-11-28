import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface IConstructorInfo {
    _id?: string; // MongoDB ID
    constructorId: string; // Add constructorId
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
            map((response) => response.results || [])
        );
    }

    createConstructor(constructor: IConstructorInfo): Observable<IConstructorInfo> {
        return this.http.post<IConstructorInfo>(this.apiUrl, constructor);
    }

    getConstructorById(id: string): Observable<IConstructorInfo> {
        return this.http.get<{ results: IConstructorInfo }>(`${this.apiUrl}/${id}`).pipe(
            map((response) => response.results)
        );
    }

    updateConstructor(constructor: IConstructorInfo): Observable<IConstructorInfo> {
        return this.http.put<IConstructorInfo>(`${this.apiUrl}/${constructor._id}`, constructor);
    }

    deleteConstructor(_id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    }
}
