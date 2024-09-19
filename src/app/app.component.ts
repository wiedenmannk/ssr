import { Component, OnInit } from "@angular/core";
import { MessageService, Message } from "primeng/api";
import { toaster } from "@service/toaster";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
	constructor(private ms: MessageService) {}

	ngOnInit(): void {
		toaster.subscribe((msg: Message | null) => {
			if (msg) {
				this.ms.add(msg);
			}
		});
	}
}
