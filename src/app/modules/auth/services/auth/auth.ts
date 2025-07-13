import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly API_PREFIX: string;

  constructor(private http: HttpClient) {
    this.API_PREFIX = 'auth';
  }

  register(params: Object): Observable<Object> {
    return this.http.post(`${this.API_PREFIX}/register`, params);
  }
}
