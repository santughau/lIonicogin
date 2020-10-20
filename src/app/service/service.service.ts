import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient,) {

  }
  getDist(): Observable<any> {
    return this.http.get("http://localhost/hajeri/getDistrict.php");
  }

  getTaluka(id): Observable<any> {
    return this.http.post("http://localhost/hajeri/getTaluka.php", { id: id })
  }

  saveLogin(data) {
    return this.http.post("http://localhost/hajeri/login.php", data);
  }
}
