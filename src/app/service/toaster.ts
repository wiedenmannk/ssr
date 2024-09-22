import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "primeng/api";
import { BehaviorSubject } from "rxjs";

export const toaster = new BehaviorSubject<Message | null>(null);

export class ToasterService {
	private toaster = toaster;
	public add(msg: Message | null): void {
		this.toaster.next(msg);
	}
	public addHttpError(detail: string, error: HttpErrorResponse): void {
		this.toaster.next({
			severity: "error",
			summary: "Error",
			detail: `${detail} ${error.error.error} ${error.error.details}`,
		});
	}
}

export const toasterService = new ToasterService();
