import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import AppServerModule from "./src/main.server";
import nocache from "nocache";
import axios from "axios";
import { ProductService } from "./src/app/service/product-server-service";
import { existsSync, writeFileSync, mkdirSync } from "fs";

interface Product {
  id: number;
  name: string;
  description: string;
  serial: number;
}

function getRandomInt(max: number): number {
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

	/* server routings */
	/*
	server.get("/product/:id", (req, res) => {
		const productId = req.params.id;
		console.log("product api call "+productId);

		// Beispiel-Daten, ersetzen Sie dies mit einem echten Datenabruf
		const productData = { id: productId, name: `Product ${productId}` };
		console.log("server route /product/:id", productData);

		// Server-Side Rendering mit Angular Universal
		res.render("index", {
			req,
			providers: [{ provide: "PRODUCT_DATA", useValue: productData }],
		});
	});
*/

	server.get("/api/home", (req, res) => {
		console.log("call /api/home");
		const welcome = {
			welcome: "Hello from Node.js Server"
		};
		res.json(welcome);
	});

	// Beispiel für eine neue API-Route
	server.get("/api/ptest", async (req, res) => {
		try {
			const response = await axios.get("http://localhost:4000/product/1", {
				headers: { "Accept": "text/html" }
			});
			const pageContent = response.data;

			// Verzeichnis 'files' erstellen, falls es nicht existiert
			const dir = join(process.cwd(), "files");
			if (!existsSync(dir)){
				mkdirSync(dir);
			}

			// Schreiben des Inhalts in die Datei 'files/test.html'
			const filePath = join(dir, "test.html");
			writeFileSync(filePath, pageContent, "utf8");

			// Hier könnte man eine Prüfung des Inhalts durchführen
			if (pageContent.includes("Erwarteter Inhalt")) {
				res.status(200).send("Test erfolgreich und Inhalt in test.html geschrieben!");
			} else {
				res.status(500).send("Test fehlgeschlagen, aber Inhalt in test.html geschrieben.");
			}
		} catch (error) {
			res.status(500).send("Fehler beim Abrufen der Seite: " + (error as Error).message);
		}
	});



	// Route for fetching product data from Python server

	server.get("/api/products/:id", async (req, res) => {
		const productId = req.params.id;
		console.log("call product api productId " + productId);
		try {
			const response = await axios.get(`http://127.0.0.1:5000/api/product/${productId}`);
			console.log("product api product data", response.data);
			res.json(response.data);
		} catch (error: unknown) {
			console.error("Error fetching product data from Python server:", error);
			if (error instanceof Error) {
				res.status(500).json({
					error: "Failed to fetch product data from Python server",
					details: error.message,
				});
			} else {
				res.status(500).json({
					error: "Failed to fetch product data from Python server",
					details: "Unknown error",
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
	server.get(
		"**",
		express.static(browserDistFolder, {
			maxAge: "1y",
			index: "index.html",
		})
	);

	// All regular routes use the Angular engine
	server.get("**", async (req, res, next) => {
		console.log("angular route detected", req.url);
		const { protocol, originalUrl, baseUrl, headers } = req;
		const productId = req.query["productId"] as string;
		console.log("product call", productId);
		const productData = null;
		// console.log("request", req);
		console.log("path", req.path);
		if(req.path.indexOf("/api/products/") !== -1) {
			console.log("product found");
		}

		// productData = await ProductService.getProductData(productId);

		try {
			commonEngine
				.render({
					bootstrap: AppServerModule,
					documentFilePath: indexHtml,
					url: `${protocol}://${headers.host}${originalUrl}`,
					publicPath: browserDistFolder,
					providers: [
						{ provide: APP_BASE_HREF, useValue: baseUrl },
						{ provide: "PRODUCT_DATA", useValue: productData }, // Inject product data
					],
				})
				.then((html) => res.send(html))
				.catch((err) => next(err));
		} catch (error) {
			console.error("Error rendering Angular application:", error);
			res.status(500).json({
				error: "Failed to render Angular application",
				details: error instanceof Error ? error.message : "Unknown error",
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
