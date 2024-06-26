import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";

const modules = [ButtonModule, MenubarModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [modules],
})
export class PrimengModule {}
