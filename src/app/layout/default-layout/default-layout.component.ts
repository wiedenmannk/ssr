import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
	selector: "app-default-layout",
	templateUrl: "./default-layout.component.html",
	styleUrl: "./default-layout.component.scss"
})
export class DefaultLayoutComponent {
	items: MenuItem[] | undefined= [
		{
			label: "Home",
			icon: "pi pi-home",
			routerLink: "/"
		},
		{
			label: "TEST",
			icon: "pi pi-star",
			routerLink: "/test"
		},
		{
			label:"Products",
			items: [
				{
					label: "Product 1",
					routerLink: "/product/1"
				},
				{
					label: "Product 2",
					routerLink: "/product/2"
				}
			]
		},
		{
			label: "Templates",
			icon: "pi pi-palette",
			items: [
				{
					label: "Sammelbox",
					icon: "pi pi-palette",
					routerLink: "/sammelbox",
				},
				{
					label: "Standalone Component",
					icon: "pi pi-bolt",
					routerLink: "/standalone"

				},
			]
		},
	];

}
