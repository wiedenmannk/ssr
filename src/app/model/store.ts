import { Product } from "./product";

export class Store {
	private product?: Product;

	constructor() {}

	public setProduct(product: Product): void {
		this.product = product;
	}

	public getProduct(): Product | undefined {
		return this.product;
	}

}

export const store = new Store();
