import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, StateKey } from "@angular/core";
import { TransferState, makeStateKey } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class TransferStateService {
	constructor(@Inject(PLATFORM_ID) private platformId: object, private transferState: TransferState) {}

	set<T>(key: string, value: T): void {
		const stateKey = makeStateKey<T>(key);
		if (isPlatformServer(this.platformId)) {
			console.log("setze State Key", key);
			console.log("StateValue", value);
			this.transferState.set(stateKey, value);
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

	// Funktion, die ein Observable zurückgibt, das auf ein bestimmtes StateKey wartet
	waitForStateKey<T>(key: string): Observable<T> {
		const stateKey = makeStateKey<T>(key);

		return new Observable((observer: Observer<T>) => {
			const storedData = this.transferState.get<T>(stateKey, null as any);
			if (storedData !== null) {
				observer.next(storedData);
				observer.complete();
			} else {
				// Observer registrieren, um bei Änderungen am StateKey informiert zu werden
				const onSerializeFn = ():T => {
					const data = this.transferState.get<T>(stateKey, null as any);
					observer.next(data);
					observer.complete();
					return data; // Rückgabe des Wertes, um den erwarteten Rückgabewert sicherzustellen
				};
				this.transferState.onSerialize(stateKey, onSerializeFn);
			}
		});
	}
}

