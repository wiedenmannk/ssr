import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { TransferStateService } from "./transfer-state.service";
import { makeStateKey, StateKey } from "@angular/core";
import { Product } from "@model/product";



@Injectable({
	providedIn: "root"
})
export class ProductService {
	constructor(
    private http: HttpClient,
    private transferStateService: TransferStateService
	) {}

	fetchProductData(id: string): Observable<Product> {
		const PRODUCT_KEY: StateKey<Product> = makeStateKey<Product>(`product-${id}`);

		const storedProduct = this.transferStateService.get(PRODUCT_KEY, null);
		if (storedProduct) {
			console.log("StoredProduct found",storedProduct);
			return of(storedProduct);
		} else {
			return this.http.get<Product>(`/api/products/${id}`).pipe(
				tap(product => {
					console.log("no product found for",PRODUCT_KEY);
					this.transferStateService.set(PRODUCT_KEY, product);
				})
			);
		}
	}
}
