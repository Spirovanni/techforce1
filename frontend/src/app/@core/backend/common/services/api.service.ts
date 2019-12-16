import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl = 'http://localhost:3001/api/organizations/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2F' +
      'wLm9yZy93cy8yMDA1LzA1L2lkZW5' +
      '0aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZ' +
      'W50aXR5L2NsYWltcy9uYW1lIjoiQFVzZXIiLCJyb2xlIjoidXNlciIsIm5iZiI6MTU2NDA2MTQ1Ny' +
      'wiZXhwIjoxNTk1NjgzODU3LCJpc3MiOiJpc' +
      '3N1ZXJfc2FtcGxlIiwiYXVkIjoiYXVkaWVuY2Vfc2FtcGxlIn0.xAAbQIOsw3ZXlIxDFnv5NynZy7OfzrvrJYWsy2NEBbA',
    });

  constructor(
    private httpClient: HttpClient,
  ) { }

  getOrganizations() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
  }
}
