import { HomeService } from "./../../service/home.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
  message?: string;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
      console.log("run home c and service");

      this.homeService.getHomeData().subscribe((data: any) => {
        this.message = data.welcome;
      });
  }
}
