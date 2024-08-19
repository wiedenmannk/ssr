import {
	AfterViewInit,
	Component,
	ContentChildren,
	Directive,
	Input,
	QueryList,
	TemplateRef,
	AfterContentInit,
} from "@angular/core";
import { SbTemplateDirective } from "src/app/directive/sb-template.directive";

@Component({
	selector: "sb-box",
	templateUrl: "./box.component.html",
	styles: [
		`
			.sb-box {
				border: 1px solid #ddd;
				padding: 1em;
				border-radius: 4px;
			}
			.sb-box-header {
				font-weight: bold;
				margin-bottom: 1em;
			}
			.sb-box-footer {
				margin-top: 1em;
			}
		`,
	],
})
export class BoxComponent implements AfterContentInit {
	@Input() style: any;

	@ContentChildren(SbTemplateDirective)
	templates!: QueryList<SbTemplateDirective>;

	headerTemplate!: SbTemplateDirective | null;
	footerTemplate!: SbTemplateDirective | null;

	constructor() {}

	ngAfterContentInit(): void {
		this.headerTemplate =
			this.templates.find((t) => t.sbTemplate === "header") || null;

		this.footerTemplate =
			this.templates.find((t) => t.sbTemplate === "footer") || null;
	}
}
