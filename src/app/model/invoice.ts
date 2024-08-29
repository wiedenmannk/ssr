import { Customer } from "./customer";
export interface Invoice {
	date: Date;
	customer: Customer;
	summe: string;
	nummer: string;
}
