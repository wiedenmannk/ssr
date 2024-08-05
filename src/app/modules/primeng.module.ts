import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";

const modules = [ButtonModule, MenubarModule, CardModule];

@NgModule({
	declarations: [],
	imports: [CommonModule, ...modules],
	exports: [modules],
})
export class PrimengModule {}
