import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Digimon } from './../models/digimon.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://digimon-api.vercel.app/api/digimon';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{

    return this.http.get<any>(this.urlApi);
  }

  public addData(digimon: Digimon): Observable<Digimon>{
    return this.http.post<Digimon>(this.urlApi, digimon)
  }


}

