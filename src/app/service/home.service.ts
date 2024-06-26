import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HomeService {

  homeUrl = "http://localhost:4200/data/home.json";
  // homeUrl = "/data/home.json";
  constructor(private http: HttpClient) { }

  public getHomeData(): Observable<any> {
    console.log("run service");
    return this.http.get(this.homeUrl).pipe(
      catchError(error => {
        console.error("Error loading home data", error);
        return of(null); // Fallback, wenn ein Fehler auftritt
      })
    );
  }
}
