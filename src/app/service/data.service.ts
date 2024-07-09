import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { isPlatformServer } from "@angular/common";

@Injectable({
	providedIn: "root"
})
export class DataService {

	private apiUrl = "/api/data";
	private serverApiUrl = "http://127.0.0.1:5000/api/data";

	constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient) { }

	public getData(): Observable<any> {
		let apiUrl = this.apiUrl;
		if(isPlatformServer(this.platformId)) {
			apiUrl = this.serverApiUrl;
			console.log("run dataService on server", apiUrl);
		}
		console.log("run dataService");
		return this.http.get(apiUrl).pipe(
			catchError(error => {
				console.error("Error loading home data", error);
				return of(null); // Fallback, wenn ein Fehler auftritt
			})
		);
	}

}
