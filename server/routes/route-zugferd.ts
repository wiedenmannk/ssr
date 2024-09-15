import express from "express";
import axios from "axios";
import multer from "multer";
import { writeFile } from "fs/promises";

const upload = multer(); // Nutze multer, um Dateien als Buffer zu verarbeiten

export const router = express.Router();

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

async function saveBase64StringAsText(base64String: string, filePath: string) {
	try {
		await writeFile(filePath, base64String, "utf8");
		console.log("Datei wurde erfolgreich geschrieben.");
	} catch (err) {
		console.error("Fehler beim Schreiben der Datei:", err);
	}
}
