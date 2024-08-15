import { APP_ID, NgModule } from "@angular/core";
import {
	BrowserModule,
	provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { PrimengModule } from "./modules/primeng.module";
import { HomeComponent } from "./pages/home/home.component";
import { provideHttpClient } from "@angular/common/http";
import { DataComponent } from "./components/data/data.component";
import { ProductComponent } from "./components/product/product.component";
import { TestComponent } from "./components/test/test.component";
import { SammlungBoxenComponent } from './pages/sammlung-boxen/sammlung-boxen.component';
import { HeadlinesComponent } from './pages/headlines/headlines.component';
import { BoxVariationComponent } from './pages/box-variation/box-variation.component';

@NgModule({
	declarations: [AppComponent, DefaultLayoutComponent, HomeComponent, DataComponent, ProductComponent, TestComponent, SammlungBoxenComponent, HeadlinesComponent, BoxVariationComponent],
	imports: [BrowserModule, AppRoutingModule, PrimengModule],
	providers: [
		provideClientHydration(),
		provideHttpClient(),
		{ provide: APP_ID, useValue: "ssr_hydra" },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
