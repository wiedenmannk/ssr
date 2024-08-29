import { AfterViewInit, Component, OnInit } from "@angular/core";
import { PlatformService } from "@service/platform.service";

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

	constructor(private ps: PlatformService) {}

	ngOnInit(): void {
		this.renderPie();
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

	async generatePDF(): Promise<void> {
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

			html2pdf().from(element).set(options).save();
		}
	}

	printPdf(): void {
		if (this.ps.isBrowser()) {
			this.generatePDF();
		}
	}
}
