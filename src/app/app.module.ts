import { NgModule } from "@angular/core";
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

@NgModule({
	declarations: [AppComponent, DefaultLayoutComponent, HomeComponent, DataComponent, ProductComponent, TestComponent],
	imports: [BrowserModule, AppRoutingModule, PrimengModule],
	providers: [
		provideClientHydration(),
		provideHttpClient(),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
