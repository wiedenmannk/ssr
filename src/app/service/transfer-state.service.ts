import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { TransferState, makeStateKey, StateKey } from "@angular/core";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";

@Injectable({
	providedIn: "root"
})
export class TransferStateService {
	constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object
	) {}

	set<T>(key: StateKey<T>, value: T): void {
		if (isPlatformServer(this.platformId)) {
			console.log("setze State Key", key);
			console.log("StateValue", value);
			this.transferState.set(key, value);
		}
	}

	get<T>(key: StateKey<T>, defaultValue: T): T | null {
		if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(key)) {
			console.log("StateKey found", key);
			const value = this.transferState.get(key, defaultValue);
			console.log("StateKey value", value);
			this.transferState.remove(key);
			return value;
		}
		return null;
	}
}
