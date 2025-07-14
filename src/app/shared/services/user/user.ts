import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User as UserModel } from '../../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  readonly API_PREFIX: string;

  constructor(private http: HttpClient) {
    this.API_PREFIX = 'user';
  }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_PREFIX}`, {
      withCredentials: true,
    });
  }
}
