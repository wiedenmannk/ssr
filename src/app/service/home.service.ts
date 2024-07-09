import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { isPlatformServer } from "@angular/common";

@Injectable({
	providedIn: "root"
})
export class HomeService {

	// homeUrl = "http://localhost:4200/data/home.json";
	host = "http://localhost:4000";
	homeUrl = "/api/home";
	hostUrl = this.host+this.homeUrl;
	constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient) { }

	public getHomeData(): Observable<any> {
		let homeUrl = this.homeUrl;
		if(isPlatformServer(this.platformId)) {
			homeUrl = this.hostUrl;
			console.log("run service on server", homeUrl);
		}
		console.log("run homeService");
		return this.http.get(homeUrl).pipe(
			catchError(error => {
				console.error("Error loading home data", error);
				return of(null); // Fallback, wenn ein Fehler auftritt
			})
		);
	}
}
