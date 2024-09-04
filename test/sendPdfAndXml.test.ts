import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from "axios";

// __dirname und __filename für ES-Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Die Funktion, die den PDF- und XML-Content sendet
async function sendPdfAndXml(pdfBase64: string, xmlContent: string) {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/generate-zugferd",
			{
				pdf_content: pdfBase64,
				xml_content: xmlContent,
			},
		);

		return response;
	} catch (error) {
		console.error("Error sending PDF and XML:", error);
		throw error;
	}
}

// Testdaten laden
async function loadTestData() {
	const pdfBase64 = fs.readFileSync(
		path.resolve(__dirname, "pdfBase64.txt"),
		"utf8",
	);
	const xmlContent = "<xml>Test ZUGFeRD XML</xml>"; // Dummy XML content
	return { pdfBase64, xmlContent };
}

// Test ausführen
async function runTest() {
	try {
		const { pdfBase64, xmlContent } = await loadTestData();
		const response = await sendPdfAndXml(pdfBase64, xmlContent);
		console.log("Response:", response.data);
	} catch (error) {
		console.error("Test failed:", error);
	}
}

// Den Test starten
runTest();
