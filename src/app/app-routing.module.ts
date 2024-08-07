import { SammlungBoxenComponent } from "./pages/sammlung-boxen/sammlung-boxen.component";
import { MyStandaloneComponentComponent } from "./standalone/my-standalone-component/my-standalone-component.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { filter, map, switchMap } from "rxjs/operators";

import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { TestComponent } from "./components/test/test.component";

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
					description: "Werde Dein eigener Boss"
				}
			},
			{ path: "product/:id",
				component: ProductComponent,
				data: {
					title: "Produkte",
					description: "Produkt Detailansicht"
				}
			},
			{ path:	"test",
				component: TestComponent,
				data: {
					title: "Test",
					description: "Eine Test Komponente"
				}
			},
			{
				path: "standalone",
				component: MyStandaloneComponentComponent,
				data: {
					title: "Standalone",
					description: "Standalone Komponente"
				}
			},
			{
				path: "sammelbox",
				component: SammlungBoxenComponent,
				data: {
					title: "Sammelbox",
					description: "Übersicht über Sammelboxen"
				}
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		initialNavigation: "enabledBlocking" // Ensures server-side rendering
	})],
	exports: [RouterModule]
})

export class AppRoutingModule {
	constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title
	) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => this.activatedRoute),
			map(route => {
				while (route.firstChild) route = route.firstChild;
				return route;
			}),
			filter(route => route.outlet === "primary"),
			switchMap(route => route.data)
		).subscribe(data => {
			this.title.setTitle(data["title"]);
			this.meta.updateTag({ name: "description", content: data["description"] });
			// Weitere Metatags basierend auf den Daten hinzufügen
		});
	}
}
