import { NgModule } from "@angular/core";
import { provideServerRendering, ServerModule } from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
// AppRoutingModule
@NgModule({
	imports: [
		AppModule,
		ServerModule,

	],
	providers: [
		provideServerRendering(),
		// Hier registrierst du PRODUCT_DATA als Provider
		{ provide: "PRODUCT_DATA", useValue: null }  // Initialisierung, wird überschrieben
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
