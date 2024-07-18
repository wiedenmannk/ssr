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
			label: "Projects",
			icon: "pi pi-search",
			items: [
				{
					label: "Standalone Component",
					icon: "pi pi-bolt",
					routerLink: "/standalone"

				},
				{
					label: "Blocks",
					icon: "pi pi-server"
				},
				{
					label: "UI Kit",
					icon: "pi pi-pencil"
				},
				{
					label: "Templates",
					icon: "pi pi-palette",
					items: [
						{
							label: "Apollo",
							icon: "pi pi-palette"
						},
						{
							label: "Ultima",
							icon: "pi pi-palette"
						}
					]
				}
			]
		},
		{
			label: "Contact",
			icon: "pi pi-envelope"
		}
	];

}
