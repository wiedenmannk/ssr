import { APP_ID, NgModule } from "@angular/core";
import { provideServerRendering, ServerModule } from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { TransferStateService } from "@service/transfer-state.service";

@NgModule({
	imports: [
		AppModule,
		ServerModule,
	],
	providers: [
		provideServerRendering(),
		TransferStateService,
		// Hier registrierst du PRODUCT_DATA als Provider
		{ provide: APP_ID, useValue: "ssr_hydra" },
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
