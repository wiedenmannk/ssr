import { store } from "@model/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";
import { Product } from "../../model/product";



@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent implements OnInit {
	product?: Product;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		@Inject("PRODUCT_DATA") productData: Product | undefined,
		@Inject(PLATFORM_ID) private platformId: object) {
		const productId = this.route.snapshot.paramMap.get("id");
		if (isPlatformServer(this.platformId)) {
			if(productData) {
				this.product = productData;
			} else {
				if(productId) {
					this.fetchProductData(productId).subscribe(data => {
						console.log("fectching data from server", data);
						this.product = data;
						store.setProduct(data);
					});
				}
			}


			console.log("get product from server", productData);
		} else {
			console.log("running ProductComponent on browser");
			console.log("product from store", store.getProduct());
			if(this.product) {
				console.log("Product already exits", this.product);
			}
			if (productId) {
				this.fetchProductData(productId).subscribe(data => {
					console.log("fectching data from browser", data);
					this.product = data;
				});
			}
		}
	}

	fetchProductData(id: string): Observable<Product> {
		return this.http.get<Product>(`/api/products/${id}`);
	}

	ngOnInit(): void {
		/*
		const productId = this.route.snapshot.paramMap.get("id");
		const requestUrl = `/api/products/${productId}`;
		console.log("call to url:", requestUrl);
		this.http.get(requestUrl).subscribe(data => {
			console.log("product", data);
			this.product = data;
		});
		*/
	}

}
