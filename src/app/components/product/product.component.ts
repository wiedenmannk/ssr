import { store } from "@model/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID, afterRender } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";
import { Product } from "@model/product";
import { ProductService } from "@service/product.service";
import { PlatformService } from "@service/platform.service";
import { TransferStateService } from "@service/transfer-state.service";




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
		private ps: PlatformService,
		private transferStateService: TransferStateService
	) {
		const isServer = this.ps.isServer();
		this.isServer = isServer;
		this.isBrowser = this.ps.isBrowser();
		console.log("isServer", isServer);
	}


	ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get("id");
		const stateProductId = "product-"+productId;

		if (this.isServer) {
			// Code, der nur auf dem Server ausgeführt werden soll
			console.log("Running on the server");
			if(productId) {
				this.productService.fetchProductData(productId).subscribe(product => {
					this.product = product;
					console.log("stateProductId", stateProductId);
					this.transferStateService.set(stateProductId, product);
					console.log("fetched Product for client",product);
				});
			}

		}
		if (this.isBrowser) {
			// Code, der nur im Browser ausgeführt werden soll
			console.log("Running on the browser");
			if(productId) {
				console.log("call transferStateService for ID:", stateProductId);
				this.transferStateService.waitForStateKey<Product>(stateProductId).subscribe(
					(product: Product) => {
						this.product = product;
						console.log("fetched Product from State", product);
					},
					(error) => {
						console.error("Error fetching product data:", error);
					}
				);
			}

		}
	}

}
