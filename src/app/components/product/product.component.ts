import { store } from "@model/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";
import { Product } from "@model/product";
import { ProductService } from "@service/product.service";



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
		private productService: ProductService,
	) {}

	ngOnInit(): void {
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

}
