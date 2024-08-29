import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";

const modules = [ButtonModule, MenubarModule, CardModule, ChartModule];

@NgModule({
	declarations: [],
	imports: [CommonModule, ...modules],
	exports: [modules],
})
export class PrimengModule {}
