import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";


@Injectable({
	providedIn: "root"
})
export class PlatformService {

	constructor(@Inject(PLATFORM_ID) private platformId: object) { }

	public isServer():boolean {
		return isPlatformServer(this.platformId);
	}

	public isBrowser():boolean {
		return isPlatformBrowser(this.platformId);
	}
}
