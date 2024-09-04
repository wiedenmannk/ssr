import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import nocache from "nocache";
import axios from "axios";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import { CommonEngineService } from "server/service/common-engine.service";
import { router as zugferdRouter } from "./server/routes/route-zugferd";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
	const server = express();
	server.use(express.json({ limit: "15mb" })); // Für große Datenmengen
	server.use(express.urlencoded({ extended: true, limit: "15mb" }));
	server.use(nocache());
	server.use(bodyParser.json()); // For parsing application/json
	server.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
	const serverDistFolder = dirname(fileURLToPath(import.meta.url));
	const browserDistFolder = resolve(serverDistFolder, "../browser");
	const indexHtml = join(serverDistFolder, "index.server.html");
	// server.use(bodyParser());

	// const commonEngine = new CommonEngine();
	const commonEngineService = new CommonEngineService();
	commonEngineService.setBrowserDistFolder(browserDistFolder);
	commonEngineService.setIndexHtml(indexHtml);

	server.use("/api", zugferdRouter);

	server.set("view engine", "html");
	server.set("views", browserDistFolder);

	server.get("/api/home", (req, res) => {
		console.log("call /api/home");
		const welcome = {
			welcome: "Hello from Node.js Server!",
		};
		res.json(welcome);
	});

	// Beispiel für eine neue API-Route
	server.get("/api/ptest", async (req, res) => {
		try {
			const response = await axios.get("http://localhost:4000/product/1", {
				headers: { Accept: "text/html" },
			});
			const pageContent = response.data;

			// Verzeichnis 'files' erstellen, falls es nicht existiert
			const dir = join(process.cwd(), "files");
			if (!existsSync(dir)) {
				mkdirSync(dir);
			}

			// Schreiben des Inhalts in die Datei 'files/test.html'
			const filePath = join(dir, "test.html");
			writeFileSync(filePath, pageContent, "utf8");

			// Hier könnte man eine Prüfung des Inhalts durchführen
			if (pageContent.includes("Erwarteter Inhalt")) {
				res
					.status(200)
					.send("Test erfolgreich und Inhalt in test.html geschrieben!");
			} else {
				res
					.status(500)
					.send("Test fehlgeschlagen, aber Inhalt in test.html geschrieben.");
			}
		} catch (error) {
			res
				.status(500)
				.send("Fehler beim Abrufen der Seite: " + (error as Error).message);
		}
	});

	// Einfacher Endpunkt zum Empfangen von Daten
	server.post("/api/simple-endpoint", (req, res) => {
		console.log("Request Body:", req.body);
		console.log("req.files", req.files);
		res.send("Data received successfully");
	});

	// Endpunkt zum Empfangen von Formular-Daten
	server.post("/api/submit-form", (req, res) => {
		console.log("Form Data:", req.body); // Logge die Formulardaten
		res.send("Form submitted successfully");
	});

	// Proxy to python server
	server.all("/api/*", async (req, res) => {
		const url = `http://127.0.0.1:5000${req.originalUrl}`;
		console.log(`Forwarding request to: ${url}`);

		try {
			console.log("Request Headers:", req.headers);
			console.log("Request Body:", req.body);

			const response = await axios({
				method: req.method,
				url,
				headers: req.headers,
				data: req.method === "POST" ? req.body : undefined,
				params: req.method === "GET" ? req.query : undefined,
			});

			console.log("Response Status:", response.status);
			console.log("Response Data:", response.data);

			res.status(response.status).json(response.data);
		} catch (error: unknown) {
			console.error("Error forwarding request to Python server:", error);
			if (error instanceof Error) {
				res.status(500).json({
					error: "Failed to forward request to Python server",
					details: error.message,
				});
			} else {
				res.status(500).json({
					error: "Failed to forward request to Python server",
					details: "Unknown error",
				});
			}
		}
	});
	// Serve static files from /browser
	server.get(
		"**",
		express.static(browserDistFolder, {
			maxAge: "1y",
		}),
	);
	// index: "index.html",

	// All regular routes use the Angular engine
	server.get("**", async (req, res, next) => {
		console.log("angular route detected", req.url);
		const { protocol, originalUrl, baseUrl, headers } = req;
		// console.log("request", req);
		console.log("path", req.path);
		if (req.path.indexOf("/product/") !== -1) {
			const params = req.path.split("/");
			console.log("params", params);
			console.log("product found");
		}
		commonEngineService.start(req, res);
		// productData = await ProductService.getProductData(productId);
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
