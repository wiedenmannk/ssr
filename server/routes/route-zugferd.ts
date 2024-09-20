import express from "express";
import axios from "axios";
import multer from "multer";
import { writeFile } from "fs/promises";

const upload = multer(); // Nutze multer, um Dateien als Buffer zu verarbeiten

export const router = express.Router();

console.log("wathme");

router.post(
	"/generate-zugferd",
	upload.single("pdf_file"),
	async (req, res) => {
		console.log("call route generate-zugferd");
		console.log("call post /api/generate-zugferd");
		const url = `http://127.0.0.1:5000${req.originalUrl}`;
		console.log(`Forwarding request to: ${url}`);

		try {
			const pdfBuffer = req.file?.buffer;
			const json_data = JSON.parse(req.body.json_data);

			if (!pdfBuffer) {
				return res.status(400).json({ error: "PDF file is missing" });
			}

			const data = {
				pdf_content: pdfBuffer.toString("base64"),
				invoice: json_data,
			};

			/*
			const base64String: string = data.pdf_content;
			const filePath: string = "test/pdfBase64.txt";
			saveBase64StringAsText(base64String, filePath);
			*/

			console.log("prepaire data", data);

			const response = await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			// Weitergabe der Antwort des Python-Servers
			return res.status(response.status).json(response.data);
		} catch (error) {
			console.error("Error forwarding request to Python server:");
			return res.status((error as any).response?.status || 500).json({
				error: "Failed to forward request to Python server",
				details: (error as Error).message,
			});
		}
	},
);

router.post("/validate", upload.single("xml_content"), async (req, res) => {
	console.log("call route /api/validate");
	console.log("call post /api/generate-zugferd");
	const url = `http://127.0.0.1:5000${req.originalUrl}`;
	console.log(`Forwarding request to: ${url}`);
	console.log("body", req.body);
	const file: Express.Multer.File | undefined = req.file;
	let data;
	try {
		if (file) {
			//TODO: check mimetype for "text/xml" or pdf
			const fileBuffer = file.buffer;
			console.log("fileName", file.originalname);
			console.log("size", file.size);
			console.log("file", file);
			data = {
				xml_content: file,
			};
		} else {
			return res.status(400).json({ error: "file is missing" });
		}

		if (data) {
			console.log("prepaire data", data);

			const response = await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			// Weitergabe der Antwort des Python-Servers
			let rp;
			try {
				rp = JSON.parse(response.data);
			} catch (err: any) {
				console.log("data has no json Format", err);
				rp = response.data;
			}

			return res.status(response.status).json(rp);
		} else {
			return res.status(500).json({
				error: "no data found",
				details: "data for server request not set",
			});
		}
	} catch (error) {
		console.error("Error forwarding request to Python server:", error);
		return res.status((error as any).response?.status || 500).json({
			error: "Failed to forward request to Python server",
			details: (error as Error).message,
		});
	}
});

async function saveBase64StringAsText(base64String: string, filePath: string) {
	try {
		await writeFile(filePath, base64String, "utf8");
		console.log("Datei wurde erfolgreich geschrieben.");
	} catch (err) {
		console.error("Fehler beim Schreiben der Datei:", err);
	}
}
