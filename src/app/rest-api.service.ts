import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, concatMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "https://swapi.co/api/";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPeopleById(id_: string): Observable<any> {
    const id = id_;
    return this.http.get(apiUrl + 'people/' + id + '/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  } 
  getPeopleByUrl(url_: string): Observable<any> {
    const url = url_;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getFilm(): Observable<any> {
    return this.http.get(apiUrl + 'films/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPeople(): Observable<any> {
    return this.http.get(apiUrl + 'people/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getClassroom(): Observable<any> {
    return this.http.get('apiUrl', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getClassroomById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getStarShips(): Observable<any> {
    return this.http.get(apiUrl + 'starships/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getVehicles(): Observable<any> {
    return this.http.get(apiUrl + 'vehicles/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
