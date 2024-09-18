import { Component } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
	selector: "sb-rechnung-validator",
	templateUrl: "./rechnung-validator.component.html",
	styleUrls: [],
})
export class RechnungValidatorComponent {
	selectedFile: File | null = null;

	constructor(private ms: MessageService) {}

	onFileSelect(event: any) {
		// Der FileUploader speichert die Datei in selectedFile
		this.selectedFile = event.files[0];
		let fileName = "no file";
		if (this.selectedFile) {
			fileName = this.selectedFile.name;
		}
		this.ms.add({
			severity: "info",
			summary: "Datei ausgewählt",
			detail: fileName,
		});
	}

	onSubmit() {
		if (this.selectedFile) {
			// Hier implementierst du die Logik zum Verschicken der Datei
			// Zum Beispiel: Senden der Datei an einen Server
			this.sendFile(this.selectedFile);
		}
	}

	sendFile(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		// Hier musst du deine URL zum Server angeben
		fetch("https://example.com/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				this.ms.add({
					severity: "success",
					summary: "Erfolg",
					detail: "Datei erfolgreich hochgeladen",
				});
			})
			.catch((error) => {
				this.ms.add({
					severity: "error",
					summary: "Fehler",
					detail: "Fehler beim Hochladen der Datei",
				});
			});
	}
}
