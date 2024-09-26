import { Component } from "@angular/core";

@Component({
	selector: "sb-dialog",
	templateUrl: "./dialog.component.html",
	styles: "",
})
export class DialogComponent {
	visible: boolean = false;

	showDialog(): void {
		this.visible = true;
	}
}
