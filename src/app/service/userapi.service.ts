import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{

    return this.http.get<any>(this.urlApi);
  }

  public addData(user: User): Observable<User>{
    return this.http.post<User>(this.urlApi, user)
  }


}

