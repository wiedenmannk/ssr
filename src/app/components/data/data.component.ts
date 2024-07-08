import { Component, OnInit } from "@angular/core";
import { DataService } from "../../service/data.service";

@Component({
	selector: "app-data",
	templateUrl: "./data.component.html",
	styleUrls: ["./data.component.scss"]
})
export class DataComponent implements OnInit {
	data: any;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.getData();
	}

	getData(): void {
		this.dataService.getData().subscribe(response => {
			this.data = response;
			console.log("response",response);
		});
	}

}
