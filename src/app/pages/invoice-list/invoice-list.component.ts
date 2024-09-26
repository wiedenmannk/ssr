import { Component, OnInit, ViewChild } from "@angular/core";
import { Customer, Representative } from "@model/cusomer";
import { CustomerService } from "@service/customer.service";
import { Table } from "primeng/table";

@Component({
	selector: "sb-invoice-list",
	templateUrl: "./invoice-list.component.html",
	styles: "",
})
export class InvoiceListComponent implements OnInit {
	@ViewChild("dt2") dt2?: Table;
	customers!: Customer[];

	representatives!: Representative[];

	statuses!: any[];

	loading: boolean = true;

	activityValues: number[] = [0, 100];

	constructor(private customerService: CustomerService) {}

	ngOnInit() {
		this.customerService.getCustomersLarge().then((customers) => {
			this.customers = customers;
			this.loading = false;

			this.customers.forEach(
				(customer) => (customer.date = new Date(<Date>customer.date)),
			);
		});

		this.representatives = [
			{ name: "Amy Elsner", image: "amyelsner.png" },
			{ name: "Anna Fali", image: "annafali.png" },
			{ name: "Asiya Javayant", image: "asiyajavayant.png" },
			{ name: "Bernardo Dominic", image: "bernardodominic.png" },
			{ name: "Elwin Sharvill", image: "elwinsharvill.png" },
			{ name: "Ioni Bowcher", image: "ionibowcher.png" },
			{ name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
			{ name: "Onyama Limba", image: "onyamalimba.png" },
			{ name: "Stephen Shaw", image: "stephenshaw.png" },
			{ name: "Xuxue Feng", image: "xuxuefeng.png" },
		];

		this.statuses = [
			{ label: "Unqualified", value: "unqualified" },
			{ label: "Qualified", value: "qualified" },
			{ label: "New", value: "new" },
			{ label: "Negotiation", value: "negotiation" },
			{ label: "Renewal", value: "renewal" },
			{ label: "Proposal", value: "proposal" },
		];
	}

	clear(table: Table) {
		table.clear();
	}

	onFilterGlobal(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value ? inputElement.value : "";
		if (this.dt2) {
			this.dt2.filterGlobal(value, "contains");
		}
	}

	getSeverity(
		status: string,
	):
		| "success"
		| "secondary"
		| "info"
		| "warning"
		| "danger"
		| "contrast"
		| undefined {
		switch (status) {
			case "unqualified":
				return "danger";

			case "qualified":
				return "success";

			case "new":
				return "info";

			case "negotiation":
				return "warning";

			case "renewal":
				return undefined;
			default:
				return undefined;
		}
	}
}
