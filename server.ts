import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import AppServerModule from "./src/main.server";
import nocache from "nocache";

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
	server.get("/api/products/:id", (req, res) => {
		const productId = req.params.id;
		const productData = generateProductData();
		const product = productData[productId];
		if (product) {
			res.json(product);
		} else {
			res.status(404).send("Product not found");
		}
	});

	// Serve static files from /browser
	server.get("**", express.static(browserDistFolder, {
		maxAge: "1y",
		index: "index.html",
	}));

	// All regular routes use the Angular engine
	server.get("**", (req, res, next) => {
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
