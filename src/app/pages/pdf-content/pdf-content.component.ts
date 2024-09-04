import { AfterViewInit, Component, OnInit } from "@angular/core";
import { PlatformService } from "@service/platform.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
	selector: "sb-pdf-content",
	templateUrl: "./pdf-content.component.html",
	styles: "",
})
export class PdfContentComponent implements AfterViewInit, OnInit {
	title = "PDF Content Example";
	basicData: any;

	basicOptions: any;

	data: any;

	options: any;

	constructor(
		private ps: PlatformService,
		private http: HttpClient,
	) {}

	ngOnInit(): void {
		if (this.ps.isBrowser()) {
			this.renderPie();
		}
	}

	renderPie(): void {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue("--text-color");

		this.data = {
			labels: ["A", "B", "C"],
			datasets: [
				{
					data: [540, 325, 702],
					backgroundColor: [
						documentStyle.getPropertyValue("--blue-500"),
						documentStyle.getPropertyValue("--yellow-500"),
						documentStyle.getPropertyValue("--green-500"),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue("--blue-400"),
						documentStyle.getPropertyValue("--yellow-400"),
						documentStyle.getPropertyValue("--green-400"),
					],
				},
			],
		};

		this.options = {
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
						color: textColor,
					},
				},
			},
		};
	}

	renderBalken(): void {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue("--text-color");
		const textColorSecondary = documentStyle.getPropertyValue(
			"--text-color-secondary",
		);
		const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

		this.basicData = {
			labels: ["Q1", "Q2", "Q3", "Q4"],
			datasets: [
				{
					label: "Sales",
					data: [540, 325, 702, 620],
					backgroundColor: [
						"rgba(255, 159, 64, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(153, 102, 255, 0.2)",
					],
					borderColor: [
						"rgb(255, 159, 64)",
						"rgb(75, 192, 192)",
						"rgb(54, 162, 235)",
						"rgb(153, 102, 255)",
					],
					borderWidth: 1,
				},
			],
		};

		this.basicOptions = {
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false,
					},
				},
				x: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false,
					},
				},
			},
		};
	}

	ngAfterViewInit(): void {}

	sendData(): void {
		const data: any = { x: 2 };
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		this.http.post("/api/simple-endpoint", data, { headers }).subscribe(
			(response) => {
				console.log("Data successfully sent:", response);
			},
			(error) => {
				console.error("Error sending data:", error);
			},
		);
	}

	async generatePDF(): Promise<Blob | null> {
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-content");

		if (element) {
			const options = {
				margin: 1,
				filename: "example.pdf",
				image: { type: "jpeg", quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
			};

			return new Promise((resolve, reject) => {
				html2pdf()
					.from(element)
					.set(options)
					.toPdf()
					.get("pdf")
					.then((pdf: any) => {
						const blob = pdf.output("blob");
						console.log("PDF Blob generated successfully");
						resolve(blob);
					})
					.catch((error: any) => {
						console.error("Error generating PDF:", error);
						reject(error);
					});
			});
		}

		console.error("Element with id 'pdf-content' not found");
		return null;
	}

	async printPdf(): Promise<void> {
		if (this.ps.isBrowser()) {
			const pdfBlob = await this.generatePDF();
			console.log("pdfBlob", pdfBlob);
			if (pdfBlob) {
				const url = URL.createObjectURL(pdfBlob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "example.pdf";
				a.click();
				URL.revokeObjectURL(url);
			}
		}
	}

	async exportPdf(): Promise<void> {
		if (this.ps.isBrowser()) {
			const pdfBlob = await this.generatePDF();
			if (pdfBlob) {
				console.log("pdfBlob", pdfBlob);
				// Erstelle eine File-Instanz aus dem Blob

				const formData = new FormData();
				formData.append("pdf_file", pdfBlob, "example.pdf");
				formData.append("xxx", "222");

				const file = new File([pdfBlob], "example.pdf", {
					type: "application/pdf",
				});

				const data: any = {
					x: "21",
					pdf_file: file,
				};
				console.log("data", data);

				this.http.post("/api/generate-zugferd", formData).subscribe(
					(response: any) => {
						console.log("PDF successfully exported:", response);
					},
					(error) => {
						console.error("Error exporting PDF:", error);
					},
				);
			}
		}
	}
}
