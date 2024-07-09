import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import AppServerModule from "./src/main.server";
import nocache from "nocache";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
	serial: number;
}

// Dummy data
function generateProductData(): { [key: string]: Product } {
	return {
		"1": { id: 1, name: "Product 1", description: "Description of Product 1", serial: getRandomInt(1000) },
		"2": { id: 2, name: "Product 2", description: "Description of Product 2", serial: getRandomInt(1000) },
		// Add more products as needed
	};
}

function getRandomInt(max:number):number {
	return Math.floor(Math.random() * max);
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
	const server = express();
	server.use(nocache());
	const serverDistFolder = dirname(fileURLToPath(import.meta.url));
	const browserDistFolder = resolve(serverDistFolder, "../browser");
	const indexHtml = join(serverDistFolder, "index.server.html");

	const commonEngine = new CommonEngine();

	server.set("view engine", "html");
	server.set("views", browserDistFolder);

	// Define the type for product data

	// API endpoint to fetch product data
	/*
	server.get("/api/products/:id", (req, res) => {
		console.log("prouduct call", req.url);
		const productId = req.params.id;
		const productData = generateProductData();
		const product = productData[productId];
		if (product) {
			res.json(product);
		} else {
			res.status(404).send("Product not found");
		}
	});
*/

	// Route for fetching product data from Python server
	server.get("/api/products/:id", async (req, res) => {
		const productId = req.params.id;
		console.log("call product api productId "+req.params.id);
		try {
			const response = await axios.get(`http://127.0.0.1:5000/api/product/${productId}`);
			res.json(response.data);
		} catch (error: unknown) {
			console.error("Error fetching product data from Python server:", error);
			if (error instanceof Error) {
				res.status(500).json({
					error: "Failed to fetch product data from Python server",
					details: error.message
				});
			} else {
				res.status(500).json({
					error: "Failed to fetch product data from Python server",
					details: "Unknown error"
				});
			}
		}
	});

	// Route for fetching data from Python server
	server.get("/api/data", async (req, res) => {
		try {
			const response = await axios.get("http://127.0.0.1:5000/api/data");
			res.json(response.data);
		} catch (error: unknown) {
			console.error("Error fetching data from Python server:", error);
			if (error instanceof Error) {
				res.status(500).json({
					error: "Failed to fetch data from Python server",
					details: error.message
				});
			} else {
				res.status(500).json({
					error: "Failed to fetch data from Python server",
					details: "Unknown error"
				});
			}
		}
	});
	// Serve static files from /browser
	server.get("**", express.static(browserDistFolder, {
		maxAge: "1y",
		index: "index.html",
	}));

	// All regular routes use the Angular engine
	server.get("**", (req, res, next) => {
		console.log("angular route detected", req.url);
		const { protocol, originalUrl, baseUrl, headers } = req;

		commonEngine
			.render({
				bootstrap: AppServerModule,
				documentFilePath: indexHtml,
				url: `${protocol}://${headers.host}${originalUrl}`,
				publicPath: browserDistFolder,
				providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
			})
			.then((html) => res.send(html))
			.catch((err) => next(err));
	});

	return server;
}

function run(): void {
	const port = process.env["PORT"] || 4000;

	// Start up the Node server
	const server = app();
	server.listen(port, () => {
		console.log(`Node Express server listening on http://localhost:${port}`);
	});
}

run();
