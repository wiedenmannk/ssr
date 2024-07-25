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
    private http: HttpClient
	) {}

	fetchProductData(id: string): Observable<Product> {
		return this.http.get<Product>(`/api/products/${id}`);
	}
}
