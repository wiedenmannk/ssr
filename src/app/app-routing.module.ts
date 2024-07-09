import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./components/product/product.component";

const routes: Routes = [
	{
		path: "",
		component: DefaultLayoutComponent,
		children: [
			{
				path: "",
				component: HomeComponent
			},
			{ path: "product/:id", component: ProductComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		initialNavigation: "enabledBlocking" // Ensures server-side rendering
	})],
	exports: [RouterModule]
})

export class AppRoutingModule {}
