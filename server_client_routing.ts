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

	server.get("/api/home", (req, res) => {
		console.log("call /api/home");
		const welcome = {
			welcome: "Hello from Node.js Server"
		};
		res.json(welcome);
	});


	// Route for fetching product data from Python server
	server.get("/api/products/:id", async (req, res) => {
		const productId = req.params.id;
		console.log("call product api productId "+productId);
		try {
			const response = await axios.get(`http://127.0.0.1:5000/api/product/${productId}`);
			console.log("server.ts product data",response.data);
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
	server.get("**", async (req, res, next) => {
		console.log("angular route detected", req.url);
		const { protocol, originalUrl, baseUrl, headers } = req;
		const productId = req.query["productId"];

		try {
			const productResponse = productId
				? await axios.get(`http://127.0.0.1:5000/api/product/${productId}`)
				: null;
			const productData = productResponse ? productResponse.data : null;
			console.log("server.ts PRODUCT_DATA:", productData);
			commonEngine
				.render({
					bootstrap: AppServerModule,
					documentFilePath: indexHtml,
					url: `${protocol}://${headers.host}${originalUrl}`,
					publicPath: browserDistFolder,
					providers: [
						{ provide: APP_BASE_HREF, useValue: baseUrl },
						{ provide: "PRODUCT_DATA", useValue: productData } // Inject product data
					],
				})
				.then((html) => res.send(html))
				.catch((err) => next(err));
		} catch (error) {
			console.error("Error rendering Angular application:", error);
			res.status(500).json({
				error: "Failed to render Angular application",
				details: error instanceof Error ? error.message : "Unknown error"
			});
		}
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
