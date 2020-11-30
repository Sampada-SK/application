import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Icrud } from './icrud';

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  private apiServer = "https://jsonplaceholder.typicode.com/users";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient,private http: HttpClient) { }

 getUserData(): Observable<Icrud[]> {
    return this.httpClient.get<Icrud[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createUser(userData): Observable<Icrud> {
    return this.httpClient.post<Icrud>(this.apiServer, JSON.stringify(userData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  deleteUser(userData) {
    const url = `https://jsonplaceholder.typicode.com/users/${userData.id}`;
  
    return this.http.delete(url, this.httpOptions);
  }

  // editUser(userData) {
  //   const url = `https://jsonplaceholder.typicode.com/users/${userData.id}`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json; charset=UTF-8'
  //     })
  //   };

  //   return this.http.put(url, userData, httpOptions);
  // }

  editUser(userData): Observable<Icrud> {
    return this.httpClient.put<Icrud>(this.apiServer, JSON.stringify(userData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

 
}
