import { Component } from "@angular/core";
import { Customer } from "@model/customer";
import { Invoice } from "@model/invoice";

@Component({
	selector: "sb-invoice-overview",
	templateUrl: "./invoice-overview.component.html",
	styles: "",
})
export class InvoiceOverviewComponent {
	customer: Customer = {
		firstName: "GodeMode Tom",
		lastName: "Kress",
	};

	invoice: Invoice = {
		date: new Date(),
		customer: this.customer,
		summe: "5.000 €",
		nummer: "4711-Doom",
	};
}
