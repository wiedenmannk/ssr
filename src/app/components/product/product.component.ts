import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent implements OnInit {
	product: any;

	constructor(private route: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get("id");
		const requestUrl = `/api/products/${productId}`;
		console.log("call to url:", requestUrl);
		this.http.get(requestUrl).subscribe(data => {
			console.log("product", data);
			this.product = data;
		});
	}
}
