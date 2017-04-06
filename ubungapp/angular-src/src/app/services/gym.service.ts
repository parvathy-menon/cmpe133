import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GymService {

  constructor(private http: Http) { 

  }

  getGyms() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/gyms/95113', { headers: headers })
      .map(res => res.json());
  }

}
