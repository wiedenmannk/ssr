import { HomeService } from "./../../service/home.service";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
	message?: string;
	data: any;

	constructor(@Inject(PLATFORM_ID) private platformId: object, private homeService: HomeService) {
		if (isPlatformBrowser(this.platformId)) {
			// Client-side only code
		}
	}


	ngOnInit(): void {
		console.log("run home component");

		this.homeService.getHomeData().subscribe((data: any) => {
			this.message = data.welcome;
		});


	}


}
