import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import AppServerModule from "../../src/main.server";
import express from "express";
import { APP_ID } from "@angular/core";

export class CommonEngineService {
	public commonEngine = new CommonEngine();
	private indexHtml?: string;
	private browserDistFolder?: string;
	private nextFunction: express.NextFunction = (err: any) => {
		console.log("Rendering Engine Error", err);
		return err;
	};

	public start(
		req: any,
		res: any,
		indexHtml?: string,
		browserDistFolder?: string,
	): void {
		const { protocol, originalUrl, baseUrl, headers } = req;
		if (!indexHtml) {
			if (!this.indexHtml) {
				console.warn("no indexHtml for CommonEngineService");
			}
			indexHtml = this.indexHtml;
		}
		if (!browserDistFolder) {
			if (!this.browserDistFolder) {
				console.warn("no browserDistFolder for CommonEngineService");
			}
			browserDistFolder = this.browserDistFolder;
		}
		try {
			this.commonEngine
				.render({
					bootstrap: AppServerModule,
					documentFilePath: indexHtml,
					url: `${protocol}://${headers.host}${originalUrl}`,
					publicPath: browserDistFolder,
					providers: [
						{ provide: APP_BASE_HREF, useValue: baseUrl },
						{ provide: APP_ID, useValue: "ssr_hydra" },
					],
				})
				.then((html: any) => {
					return res.send(html);
				})
				.catch((err: any) => this.nextFunction(err));
		} catch (error) {
			console.error("Error rendering Angular application:", error);
			res.status(500).json({
				error: "Failed to render Angular application",
				details: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	public setIndexHtml(indexHtml: string): void {
		this.indexHtml = indexHtml;
	}

	public setBrowserDistFolder(browserDistFolder: string): void {
		this.browserDistFolder = browserDistFolder;
	}
}
