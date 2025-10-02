import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http:HttpClient) { }

  mainUrl:string = "https://fakerestapi.azurewebsites.net"
  apiVersion:string = "/api/v1/"
  

  userLogin(body:Object){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<any>(this.mainUrl + '/login', body, {headers})
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  getAll(category:string):Observable<any>{
    return this.http.get<any>(this.mainUrl + this.apiVersion + category)
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  getById(category:any, id:number):Observable<any>{
    return this.http.get<any>(this.mainUrl + this.apiVersion + category + `/${id}`)
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  post(category:any, body:Object):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<any>(this.mainUrl + this.apiVersion + category, body, {headers})
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  put(category:any, id:number, body:Object):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.put<any>(this.mainUrl + this.apiVersion + category + `/${id}`, body, {headers})
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  delete(category:any, id:number):Observable<any>{
    return this.http.delete<any>(this.mainUrl + this.apiVersion + category + `/${id}`)
    .pipe(catchError((error:any)=>this.handleError(error)));
  }

  handleError(errorRes: HttpErrorResponse) { 
    let errorMessage = 'An unknown error occurred!';
    
    if (!errorRes.error || !errorRes.error.messages) { 
      return throwError(()=>errorMessage);
    } else { 
      errorMessage = errorRes.error.messages[0];
    }
    return throwError(()=>errorMessage);
  }
}