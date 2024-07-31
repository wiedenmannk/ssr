import { store } from "@model/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID, afterRender, makeStateKey, TransferState } from "@angular/core";
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
	stateProductId: string;
	productId: string | null;
	dump?: string;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private productService: ProductService,
		private ps: PlatformService,
		private transferStateService: TransferStateService,
		private tss: TransferState
	) {
		const isServer = this.ps.isServer();
		this.isServer = isServer;
		this.isBrowser = this.ps.isBrowser();
		console.log("isServer", isServer);
		const productId = this.route.snapshot.paramMap.get("id");
		this.stateProductId = "product-"+productId;
		this.productId = productId;
	}


	ngOnInit(): void {
		const productId = this.productId;
		const stateProductId = this.stateProductId;
		this.showDump();
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

		/*
		if (this.isBrowser) {

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
			*/
	}

	getState(): Product | null {
		this.showDump();
		const stateKey = makeStateKey<Product>(this.stateProductId);
		console.log("hole stateKey", stateKey);
		const product : Product | null = this.transferStateService.get<Product | null>(stateKey, null);
		if(product) {
			this.product = product;
		}

		return product;
	}

	showDump(): void {
		// this.dump = this.transferStateService.dump();
		this.dump = this.tss.toJson();
	}

}
