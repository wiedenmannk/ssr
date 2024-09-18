import { SammlungBoxenComponent } from "./pages/sammlung-boxen/sammlung-boxen.component";
import { MyStandaloneComponentComponent } from "./standalone/my-standalone-component/my-standalone-component.component";
import { NgModule } from "@angular/core";
import {
	RouterModule,
	Routes,
	ActivatedRoute,
	NavigationEnd,
	Router,
} from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { filter, map, switchMap } from "rxjs/operators";

import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { TestComponent } from "./components/test/test.component";
import { HeadlinesComponent } from "./pages/headlines/headlines.component";
import { BoxVariationComponent } from "./pages/box-variation/box-variation.component";
import { BoxComponentOverviewComponent } from "./pages/box-component-overview/box-component-overview.component";
import { ImpressumComponent } from "./pages/impressum/impressum.component";
import { InvoiceOverviewComponent } from "./pages/invoice-overview/invoice-overview.component";
import { PdfContentComponent } from "./pages/pdf-content/pdf-content.component";
import { RechnungValidatorComponent } from "./pages/rechnung-validator/rechnung-validator.component";

const routes: Routes = [
	{
		path: "",
		component: DefaultLayoutComponent,
		children: [
			{
				path: "",
				component: HomeComponent,
				data: {
					title: "SelbstBoss",
					description: "Werde Dein eigener Boss",
				},
			},
			{
				path: "product/:id",
				component: ProductComponent,
				data: {
					title: "Produkte",
					description: "Produkt Detailansicht",
				},
			},
			{
				path: "test",
				component: TestComponent,
				data: {
					title: "Test",
					description: "Eine Test Komponente",
				},
			},
			{
				path: "standalone",
				component: MyStandaloneComponentComponent,
				data: {
					title: "Standalone",
					description: "Standalone Komponente",
				},
			},
			{
				path: "sammelbox",
				component: SammlungBoxenComponent,
				data: {
					title: "Sammelbox",
					description: "Übersicht über Sammelboxen",
				},
			},
			{
				path: "headlines",
				component: HeadlinesComponent,
				data: {
					title: "Headlines",
					description: "Übersicht über Überschriften",
				},
			},
			{
				path: "boxcollection",
				component: BoxVariationComponent,
				data: {
					title: "Box Variations",
					description: "Variationen für Boxen",
				},
			},
			{
				path: "boxoverview",
				component: BoxComponentOverviewComponent,
				data: {
					title: "Box Komponenten",
					description: "Nutze Angular für Boxen",
				},
			},
			{
				path: "impressum",
				component: ImpressumComponent,
				data: {
					title: "Impressum",
					description: "Dies ist das Impressum von SelbstBoss.de",
				},
			},
			{
				path: "e-rechnung",
				component: InvoiceOverviewComponent,
				data: {
					title: "Rechnung Beispiel",
					description: "Dies ist das Beispiel für E-Rechnung",
				},
			},
			{
				path: "pdf",
				component: PdfContentComponent,
				data: {
					title: "Pdf Rechnung",
					description: "Dies ist das Beispiel für PDF erstellung",
				},
			},
			{
				path: "validator",
				component: RechnungValidatorComponent,
				data: {
					title: "Rechnung Validator",
					description: "Zugferd Rechnung Validator",
				},
			},
		],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: "enabledBlocking", // Ensures server-side rendering
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private meta: Meta,
		private title: Title,
	) {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => this.activatedRoute),
				map((route) => {
					while (route.firstChild) route = route.firstChild;
					return route;
				}),
				filter((route) => route.outlet === "primary"),
				switchMap((route) => route.data),
			)
			.subscribe((data) => {
				this.title.setTitle(data["title"]);
				this.meta.updateTag({
					name: "description",
					content: data["description"],
				});
				// Weitere Metatags basierend auf den Daten hinzufügen
			});
	}
}
