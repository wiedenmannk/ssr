import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { FileSelectEvent, FileUpload } from "primeng/fileupload";
import { toaster } from "@service/toaster";
import { ValidatorResult } from "@model/valdiator-result";

@Component({
	selector: "sb-rechnung-validator",
	templateUrl: "./rechnung-validator.component.html",
	styleUrls: [],
})
export class RechnungValidatorComponent {
	selectedFile: File | null = null;
	@ViewChild("fileUpload") fileUpload?: FileUpload;
	validatorFile?: File | null;
	isLoading = false; // Variable für den Spinner
	validationResult: ValidatorResult | null = null; // Speichert das Validierungsergebnis
	result: Array<{ key: string; value: any }> = [];

	constructor(private http: HttpClient) {}

	onFileChange(event: FileSelectEvent): void {
		if (this.fileUpload) {
			const eventFileUpload = event.originalEvent.target as unknown;
			const fileUpload: FileUpload = eventFileUpload as FileUpload;
			const myFile: File = this.fileUpload.files[0];
			this.validatorFile = myFile;
			this.fileUpload.clear();
		}
	}

	submit(): void {
		if (!this.validatorFile) {
			return;
		}
		if (this.fileUpload) {
			this.fileUpload.clear();
		}

		this.isLoading = true; // Spinner anzeigen

		const formData = new FormData();
		formData.append("xml_content", this.validatorFile, this.validatorFile.name);
		this.result = [];

		this.http.post("/api/validate", formData).subscribe(
			(response: any) => {
				this.validationResult = response as ValidatorResult; // Validierungsergebnis speichern
				toaster.next({
					severity: "info",
					summary: "Success",
					detail: "File Uploaded successfully",
				});
				this.validatorFile = null;
				this.isLoading = false; // Spinner ausblenden
				this.result = this.getTableData(this.validationResult);
				console.log("result", this.result);
				console.log("validationResult", this.validationResult);
			},
			(error: HttpErrorResponse) => {
				toaster.next({
					severity: "error",
					summary: "Error",
					detail: `File Upload failed ${error.error.error} ${error.error.details}`,
				});
				this.isLoading = false; // Spinner ausblenden
			},
		);
	}

	getTableData(
		validatorResult: ValidatorResult,
	): Array<{ key: string; value: any }> {
		const result: Array<{ key: string; value: any }> = [];

		// Verwenden von Object.keys, um alle Schlüssel korrekt zu durchlaufen
		for (const key of Object.keys(validatorResult)) {
			result.push({
				key,
				value: validatorResult[key as keyof ValidatorResult],
			});
		}

		return result;
	}
}
