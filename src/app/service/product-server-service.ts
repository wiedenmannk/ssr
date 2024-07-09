import axios from "axios";
import { Product } from "../model/product";

export class ProductService {
	static async getProductData(productId: string): Promise<Product> {
		try {
			const response = await axios.get(`http://127.0.0.1:5000/api/product/${productId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching product data from Python server:", error);
			throw error;
		}
	}
}
