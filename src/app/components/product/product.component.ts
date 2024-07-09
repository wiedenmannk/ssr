import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent implements OnInit {
	product: any;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		@Inject("PRODUCT_DATA") productData: any,
		@Inject(PLATFORM_ID) private platformId: object) {
		if (isPlatformServer(this.platformId)) {
			this.product = productData;
			console.log("get product from server", productData);
		} else {
			console.log("running ProductComponent on browser");
			const productId = this.route.snapshot.paramMap.get("id");
			if (productId) {
				this.fetchProductData(productId).subscribe(data => {
					console.log("fectching data from browser", data);
					this.product = data;
				});
			}
		}
	}

	fetchProductData(id: string): Observable<any> {
		return this.http.get(`/api/products/${id}`);
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
