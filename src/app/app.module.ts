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
import { SammlungBoxenComponent } from "./pages/sammlung-boxen/sammlung-boxen.component";
import { HeadlinesComponent } from "./pages/headlines/headlines.component";
import { BoxVariationComponent } from "./pages/box-variation/box-variation.component";
import { BoxComponentOverviewComponent } from "./pages/box-component-overview/box-component-overview.component";
import { BoxComponent } from "./components/box/box.component";
import { SbTemplateDirective } from "./directive/sb-template.directive";
import { ImpressumComponent } from "./pages/impressum/impressum.component";
import { InvoiceOverviewComponent } from "./pages/invoice-overview/invoice-overview.component";
import { DatePipe } from "@angular/common";
import { PdfContentComponent } from "./pages/pdf-content/pdf-content.component";
import { RechnungValidatorComponent } from "./pages/rechnung-validator/rechnung-validator.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SbFormsModule } from "@modules/sb-forms.module";
import { MessageService } from "primeng/api";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HomeComponent,
		DataComponent,
		ProductComponent,
		TestComponent,
		SammlungBoxenComponent,
		HeadlinesComponent,
		BoxVariationComponent,
		BoxComponentOverviewComponent,
		BoxComponent,
		SbTemplateDirective,
		ImpressumComponent,
		InvoiceOverviewComponent,
		PdfContentComponent,
		RechnungValidatorComponent,
  LoginComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		PrimengModule,
		SbFormsModule,
	],
	providers: [
		provideClientHydration(),
		provideHttpClient(),
		{ provide: APP_ID, useValue: "ssr_hydra" },
		DatePipe,
		MessageService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
