import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { TestComponent } from "./components/test/test.component";

const routes: Routes = [
	{
		path: "",
		component: DefaultLayoutComponent,
		children: [
			{
				path: "",
				component: HomeComponent
			},
			{ path: "product/:id",
				component: ProductComponent
			},
			{ path:	"test",
				component: TestComponent
			},
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
