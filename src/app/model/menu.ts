import { MenuItem } from "primeng/api";

export const menu: MenuItem[] | undefined = [
	{
		label: "Home",
		icon: "pi pi-home",
		routerLink: "/",
	},
	{
		label: "Agenda",
		icon: "pi pi-star",
		routerLink: "/test",
	},
	{
		label: "Products",
		items: [
			{
				label: "Product 1",
				routerLink: "/product/1",
			},
			{
				label: "Product 2",
				routerLink: "/product/2",
			},
		],
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
				label: "Überschriften",
				icon: "pi pi-align-center",
				routerLink: "/headlines",
			},
			{
				label: "Box Variationen",
				icon: "pi pi-palette",
				routerLink: "/boxcollection",
			},
			{
				label: "Box mit Angular",
				icon: "pi pi-palette",
				routerLink: "/boxoverview",
			},
			{
				label: "Standalone Component",
				icon: "pi pi-bolt",
				routerLink: "/standalone",
			},
			{
				label: "dialog",
				icon: "pi pi-bolt",
				routerLink: "/dialog",
			},
		],
	},
	{
		label: "Impressum",
		routerLink: "/impressum",
	},
	{
		label: "Rechnungen",
		items: [
			{
				label: "Beispiel Rechnung",
				routerLink: "e-rechnung",
			},
			{
				label: "PDF View",
				routerLink: "pdf",
			},
			{
				label: "Rechnungs Validator",
				routerLink: "validator",
			},
			{
				label: "Rechnungsübersicht",
				routerLink: "invoice-list",
			},
		],
	},
];
