import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";

const modules = [
	ButtonModule,
	MenubarModule,
	CardModule,
	ChartModule,
	FileUploadModule,
	ToastModule,
];

@NgModule({
	declarations: [],
	imports: [],
	exports: [modules],
})
export class PrimengModule {}
