import { Component } from "@angular/core";

interface TextBox {
	key: number;
	text: string;
	class?: string;
}

@Component({
	selector: "app-headlines",
	templateUrl: "./headlines.component.html",
	styles: ""
})
export class HeadlinesComponent {
	// myCount = [0, 1, 2, 3, 4, 5];

	myCount: TextBox[] = [
		{
			key: 0,
			text: "Mein Toller Text"
		},
		{
			key: 1,
			text: "Mein Toller Text hoch 2"
		},
		{
			key: 2,
			text: "Mein Toller Text noch mehr"
		},
		{
			key: 3,
			text: "Mein Toller Text. Ich bin so toll"
		},
		{
			key: 4,
			text: "Mein Toller Text. Let's rock"
		},
		{
			key: 5,
			text: "Mein Toller Text"
		},
	];
}
