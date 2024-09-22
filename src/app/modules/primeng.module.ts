import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { PasswordModule } from "primeng/password";
import { InputTextModule } from "primeng/inputtext";

const modules = [
	ButtonModule,
	MenubarModule,
	CardModule,
	ChartModule,
	FileUploadModule,
	ToastModule,
	ProgressSpinnerModule,
	TableModule,
	PasswordModule,
	InputTextModule,
];

@NgModule({
	declarations: [],
	imports: [],
	exports: [modules],
})
export class PrimengModule {}
