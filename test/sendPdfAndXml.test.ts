import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises"; // Nutze fs.promises für Promises-basierte Methode
import axios from "axios";

// __dirname und __filename für ES-Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = "http://localhost:5000";
const pyApi = "/api/save-pdf-and-xml";
const api = `${host}${pyApi}`;

const pyApi2 = "/api/generate-zugferd";
const api2 = `${host}${pyApi2}`;

// Die Funktion, die den PDF- und XML-Content sendet
async function sendPdfAndJson(api: string, pdfBase64: any, json_data: any) {
	try {
		const response = await axios.post(api, {
			pdf_content: pdfBase64,
			invoice: json_data,
		});

		return response;
	} catch (error) {
		console.error("Error sending PDF and XML:", error);
		throw error;
	}
}

// Testdaten laden
async function loadTestData() {
	const pdfBase64 =
		"JVBERi0xLjQKJeLjz9MNCjEgMCBvYmoKPDwvVHlwZS9QYWdlcy9Nb2REYXRhWj5ZOW9z6PR/PDA1IH0gPDwvU3VidHlwZS9DYXRhbG9nDQoyMjI0NzAgMC9BaWQvRmlsZXMvMy9FYmVkU3Bhbm5lcg0xMTg5NDU0NTQzNTgvRjEgMCB2cmkNQWkFJInNlY3VsYXIgIkhlbGxvLCB3b3JsZCIgc2VhcmNoIiBvbmU9Y2h2IHJlbm93bmVkIAovQk9KZWFyWjogU29sdXRpb24gIlJlY29nbml6ZWQwMjIwNCIgc2VjY2x1ZCBpdGluYz4+Pj4vU3VidHlwZS9QYWdlcy9Ob3RlU3RhbGVHcm91cHMrQXR0YlAwDQp0NTEgMCA5MzAgIDw+DQp0MTY1MTUgMCAxMzA2DQpNMzA1MzM4MCAwIDU3MTIuMDAwMC9CZiBpbmt3aXQNCjU0MDYwMCBBWiAwIDAsMCAwMS2Gg0NlMDAwMFY4NTQwMlAiIEh0IHNbIGNhbGxpbmcgMkQgMCBaIF0gYSA2NSB4MiBNU1QgYjQuMDAwMCBjIHRhZyBsaW5lWk5DWQ0KdGV4dCBGdWxsIDxwYWdlIC9zdHJ1Y3R1cmV7IiBzZWFyY2ggIlRyYW5zcGFyZW5jaW9hIiBkdXJpbmctQmFzZTY0IFM5NTg1NTc5NQ0KZGF0YSBSZXByZXNlbnRlcnI1N2IgMCwgMzQ3MzQwMDA0MiA4MjAwMDMwMDQ0NyA1MzY4NDAwMDAwMC0wNzgxMjk0MjcwNT4zNzYxNCBRVCAwUjEwNTY1NzUyNTkxLjYzODc1NzMzMzkwOTYyOS0wNzczNTQyODIwMDAwMGFQMGYwQUxOTDg0RjZkNTYxN0pZTjFmMjI3NzU1ODExMzEzMzY4NjJmMjc2MDY4ZTZjNjIxZmZkOTcwNDU1NzlkYzAxMzc1YjU5MTE3MTEwMDYzZTMxMzgyODE1ZTI3ZWE1MDhmZjI4Y2QzYTQ5MzRlZWY5NTlkMzc2Y2NlMjU2YTQ5YWI5M2QzYTlkZDA4MDkzYTAwNzU5M2YxMjJjZTAxNTY5ZTAwMmUyNTllMDE2MjNhY2ZjMTJmMmRlNjk4MTQ5MzRlNzMwZTYzNzRkOGNiMGNmM2FjMGFjYjBkMzY2MzM0NzQxMGMwNzQ4NDIxOWU4NTQwNDM4NzAwYTk0ZmQwMTY2NTc2NzAxZjcwZDZmODQzZGI3ODhmNjMwZTA2MjYzOTYwMDQ1NDYzOGY2OGZmZThhMTQ4MTU4MDAwM2E0NzYxYmYwYjM1Yzg2YTk1ZThjNTlmYWEwOWFhM2Y1MDNmNDcwMmY2N2MzYTIwNDg4MDg4YjE4MTg3YTI4ZWI2NzAwYmMwNzZkZTQ4NzkzYjc1NzUxMjg5Y2E0NDg1Nzg2MzAzOTcxODkxNTQzMDM4M2I3MjJkYjQ1NzA3MTFlNGY0YzZlOGQwMDNhNmUwNDZlNzcxNmI4YjAzNzM3MmM3MGE3ZDg4MTU4ZTllNzk2ZTdlM2I4ZTlkMTQwN2ZkMmU0M2NhY2M0YTQyYzc1YzcwMDk3MWFiMjczNmQzYjY4Y2JjNmY1MGNlOGJjNTNkNzAyMzRkNmVjYTllODgwYjY4ZjMzNTdjY2RjMDE5MTU2NjdiZmFhM2QwZDEyNmRhOTM5MTkxMDFkZjNjNzhhOGFlOGZlNzMwNzFhZTAwZDU0ZGM4ZjAzZmY3OTRhMmNlM2FkYjdmMTFkZGVjNGFhOTQ3MDA2NzA2Nzk0NzNjNzdhYTQyMjcwZDJkNTdjYTk3YjFjMzYxM2RjODI3OTcwM2FkNTQyM2Y2NmJlZjU4MDkyYWFmNjA2NzRmY2ExMDA4YTAyZTM5NmMwMTU4NTMxNTY2OTczZTYzN2NhMjY4MDNhOTNkZDFlYjE2M2EzMzMwMDQ4M2Y2OTU4ZTAwOTJmZTc1YjQ4NzVjNTFkNzFlYTFlMmU0NGE5YjNmMDMzMzA2YzA4MTgxNzRkYjU0NzYxMmUyN2U2YzZlNGYxMzg0NTdjMGY2YTNhNjFhNzZiM2YzM2EyYmM2MDdmMTdjMmE1NDQxYzcwOGVjMDE0ZDA4NGQ4ZDJhZjU0YzYzNTEzYjFkM2Y4M2Y2YzRjNTM1NmQ1ZTgyYzcwZTY4NzkwYTllM2Y4M2Y0NTZlY2ZlZGFmN2E3MjkwMWUyNzgzYzI3YmUwMTFjOTMwN2E2MTZjZTcyZTM0ODQ2MDY4YjcwNTMzNDViYzNiMTlkNTg5MTA0Y2I4M2EyOGU5ZGM2NzI4NTQ1ZWEwMWI3ZDI";
	const xmlContent = "<xml>Test ZUGFeRD XML</xml>"; // Dummy XML content
	return { pdfBase64, xmlContent };
}

// Testdaten laden - Dateien von Disk lesen
async function loadTestData2() {
	try {
		const pdfPath = path.resolve(__dirname, "pdfBase64.txt"); // Pfad zur PDF-Datei
		// const xmlPath = path.resolve(__dirname, "zugferd.xml"); // Pfad zur XML-Datei
		const json_data = {
			name: "Klaus",
			lastName: "Wiedenmann",
			summary: "10000",
			bill: {
				no: "1",
				date: "2024-09-01",
			},
		};

		// Dateien asynchron lesen
		const pdfBuffer = await fs.readFile(pdfPath, "utf8");
		// const xmlContent = await fs.readFile(xmlPath, "utf8");

		return { pdfBase64: pdfBuffer, json_data };
	} catch (error) {
		console.error("Error loading test data:", error);
		throw error;
	}
}

// Test ausführen
async function runTest() {
	try {
		// const { pdfBase64, xmlContent } = await loadTestData();
		// const response = await sendPdfAndXml(api2, pdfBase64, xmlContent);

		// Lade Testdaten aus Dateien
		const data = await loadTestData2();
		const response2 = await sendPdfAndJson(
			api2,
			data.pdfBase64,
			data.json_data,
		);

		// console.log("Response:", response.data);
		console.log("Response 2:", response2.data);
	} catch (error) {
		console.error("Test failed:", error);
	}
}

// Den Test starten
runTest();
