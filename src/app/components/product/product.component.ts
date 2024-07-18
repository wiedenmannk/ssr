import { store } from "@model/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID, afterRender } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";
import { Product } from "@model/product";
import { ProductService } from "@service/product.service";
import { isPlatform, IsPlatform } from "src/app/decorator/is-platform";




@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent implements OnInit {
	product?: Product;
	isServer?: boolean;
	isBrowser?: boolean;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private productService: ProductService,
	) {
		const isServer = isPlatform.isServer();
		console.log("isServer", isServer);
		const productId = this.route.snapshot.paramMap.get("id");
		if(productId) {
			this.productService.fetchProductData(productId).subscribe(product => {
				this.product = product;
				console.log("fetched Product for client",product);
			});
		} else {
			console.error("no productId set");
		}
	}


	ngOnInit(): void {
		if (this.isServer) {
			// Code, der nur auf dem Server ausgeführt werden soll
			console.log("Running on the server");
		}
		if (this.isBrowser) {
			// Code, der nur im Browser ausgeführt werden soll
			console.log("Running on the browser");
		}
	}

}
