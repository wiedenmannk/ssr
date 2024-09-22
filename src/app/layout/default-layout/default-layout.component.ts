import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { menu } from "@model/menu";
import { Router } from "@angular/router";

@Component({
	selector: "app-default-layout",
	templateUrl: "./default-layout.component.html",
	styleUrl: "./default-layout.component.scss",
})
export class DefaultLayoutComponent {
	menuItems: MenuItem[] | undefined = menu;

	constructor(private router: Router) {}

	navigate(url: string): void {
		this.router.navigate([url]);
	}
}
