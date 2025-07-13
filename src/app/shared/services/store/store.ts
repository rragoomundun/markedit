import { Injectable } from '@angular/core';

import { User } from '../../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class Store {
  user: User | null;

  constructor() {
    this.user = null;
  }
}
