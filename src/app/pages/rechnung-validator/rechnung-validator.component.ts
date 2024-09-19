import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, model, ViewChild } from "@angular/core";
import {
	FileSelectEvent,
	FileUpload,
	FileUploadEvent,
} from "primeng/fileupload";
import { toaster } from "@service/toaster";

@Component({
	selector: "sb-rechnung-validator",
	templateUrl: "./rechnung-validator.component.html",
	styleUrls: [],
})
export class RechnungValidatorComponent {
	selectedFile: File | null = null;
	@ViewChild("fileUpload") fileUpload?: FileUpload;
	validatorFile?: File;

	constructor(private http: HttpClient) {}

	onFileChange(event: FileSelectEvent): void {
		if (this.fileUpload) {
			console.log("clear");
			const eventFileUpload = event.originalEvent.target as unknown;
			const fileUpload: FileUpload = eventFileUpload as FileUpload;
			console.log("event target", fileUpload);
			console.log("event files", fileUpload.files);
			// das event.originalEvent.target ist das FileUpload
			console.log("files");
			event.currentFiles[0].arrayBuffer().then((data: ArrayBuffer) => {
				console.log("fileData", data);
			});
			const myFile: File = this.fileUpload.files[0];
			this.validatorFile = myFile;
			console.log("fiĺeUpload content", myFile);
			this.fileUpload.clear();
			console.log("file still exists", myFile);
		}
	}

	submit(): void {
		const formData = new FormData();
		if (this.validatorFile) {
			formData.append(
				"xml_content",
				this.validatorFile,
				this.validatorFile.name,
			);
		}
		this.http.post("/api/validate", formData).subscribe(
			(response: any) => {
				console.log("File send successfully:", response);
				toaster.next({
					severity: "info",
					summary: "Success",
					detail: "File Uploaded success",
				});
			},
			(error: HttpErrorResponse) => {
				console.error("Error sending File:", error);
				toaster.next({
					severity: "error",
					summary: "Error",
					detail: `File Uploaded failed ${error.error.error} ${error.error.details}`,
				});
			},
		);
	}
}
