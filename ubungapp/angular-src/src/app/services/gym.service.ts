import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GymService {

  constructor(private http: Http) {

  }

  getGyms(url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers })
      .map(res => res.json());
  }

}
