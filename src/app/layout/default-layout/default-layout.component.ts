import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { menu } from "@model/menu";

@Component({
	selector: "app-default-layout",
	templateUrl: "./default-layout.component.html",
	styleUrl: "./default-layout.component.scss",
})
export class DefaultLayoutComponent {
	menuItems: MenuItem[] | undefined = menu;
}
