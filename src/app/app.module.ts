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

@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, PrimengModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
