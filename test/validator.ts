import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Pfad zur XML-Datei
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const xmlFile = "test.xml";
// const xmlFile = "zugferd.xml";

const xmlFilePath = path.join(__dirname, xmlFile);

// Funktion zum Lesen der XML-Datei und Senden an den Python-Validator
async function sendXmlToPythonValidator() {
	try {
		// Lese die XML-Datei
		const xmlData = fs.readFileSync(xmlFilePath, "utf8");

		// Sende eine POST-Anfrage an den Python-Validator
		const response = await axios.post(
			"http://localhost:5000/api/validate",
			{ xmlContent: xmlData },
			{ headers: { "Content-Type": "application/json" } },
		);
		// Ausgabe der Antwort des Validators
		console.log("Antwort vom Validator:", response.data);
	} catch (error) {
		// Typprüfung und Zugriff auf error.message
		if (axios.isAxiosError(error)) {
			// Wenn der Fehler von Axios stammt
			console.error(
				"Fehler beim Senden der XML-Datei (Axios-Fehler):",
				error.message,
			);
		} else if (error instanceof Error) {
			// Generischer JavaScript-Fehler
			console.error("Fehler beim Senden der XML-Datei:", error.message);
		} else {
			// Unbekannter Fehler
			console.error("Unbekannter Fehler beim Senden der XML-Datei:", error);
		}
	}
}

// Rufe die Funktion auf
sendXmlToPythonValidator();
