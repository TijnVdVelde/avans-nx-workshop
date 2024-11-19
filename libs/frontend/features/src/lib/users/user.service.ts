import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly users: IUserInfo[] = [
        {
            _id: '1',
            name: 'Tijn Van de Velde',
            emailAddress: 'tmh.vandevelde@studennt.avans.nl',
            role: UserRole.Unknown,
            gender: UserGender.Male,
            password: 'secret',
            isActive: true,
            profileImgUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            _id: '2',
            name: 'Bibi Van de Velde',
            emailAddress: 'blm.vandevelde@student.avans.nl',
            role: UserRole.Unknown,
            gender: UserGender.Female,
            password: 'secret',
            isActive: true,
            profileImgUrl: 'https://randomuser.me/api/portraits/women/66.jpg'
        },
    ];

    constructor() {
        console.log('UserService created');
    }

    getUsers(): IUserInfo[] {
        console.log('getUsers() aangeroepen');
        return this.users;
    }

    getUsersAsObservable(): Observable<IUserInfo[]> {
        console.log('getUsersAsObservable() aangeroepen');
        // 'of' is een rxjs operator die een Observable
        // maakt van de gegeven data.
        return of(this.users).pipe(delay(2000));
    }

    getUserById(id: string | null): IUserInfo {
        console.log('getUserById() aangeroepen');
        return this.users.filter((user) => user._id === id)[0];
    }
}
