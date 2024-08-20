import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
	selector: "[sbTemplate]",
})
export class SbTemplateDirective {
	@Input() sbTemplate!: string;

	constructor(public template: TemplateRef<any>) {}
}
