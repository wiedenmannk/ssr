import { Inject, PLATFORM_ID, Injector, Injectable, StaticProvider } from "@angular/core";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";

// Erstelle einen Provider für PLATFORM_ID

export class IsPlatform {
	private platformId: any;
	constructor() {
		const providers: StaticProvider[] = [{ provide: PLATFORM_ID, useValue: "any" }];
		const injector = Injector.create({ providers });
		this.platformId = injector.get(PLATFORM_ID);
		console.log("platformId", this.platformId);
	}

	public isServer():boolean {
		console.log("isServer", isPlatformServer(this.platformId));
		return isPlatformServer(this.platformId);
	}

	public isBrowser():boolean {
		console.log("isServer", isPlatformBrowser(this.platformId));
		return isPlatformBrowser(this.platformId);
	}

}

export const isPlatform = new IsPlatform();

/*
export function IsPlatform(target: any): any {
	const original = target;

	function construct(constructor: any, args: any): any {
		const c: any = function (this: any) {
			return constructor.apply(this, args);
		};
		c.prototype = constructor.prototype;
		const instance = new c(...args);

		// Verwende Angulars Injector, um PLATFORM_ID zu erhalten
		const platformId = injector.get(PLATFORM_ID);
		console.log("injecor isPlatform", platformId);

		instance.isServer = isPlatformServer(platformId);
		instance.isBrowser = isPlatformBrowser(platformId);

		return instance;
	}

	const newConstructor: any = function (...args: any[]) {
		return construct(original, args);
	};

	newConstructor.prototype = original.prototype;
	return newConstructor;
}
	*/
