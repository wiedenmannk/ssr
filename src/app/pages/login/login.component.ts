import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { toasterService } from "@service/toaster";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "sb-login",
	templateUrl: "./login.component.html",
	styles: [],
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	isRegisterMode = false;

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
	) {
		this.form = this.fb.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
			confirmPassword: ["", Validators.required],
		});
	}

	ngOnInit(): void {
		// Prüfen, ob die aktuelle Route 'register' ist, um den Registrierungsmodus zu setzen
		this.activatedRoute.url.subscribe((urlSegments) => {
			this.isRegisterMode = urlSegments.some(
				(segment) => segment.path === "register",
			);
			this.updateValidators();
		});
	}

	// Aktualisiert die Validierung, wenn der Modus geändert wird
	updateValidators(): void {
		if (this.isRegisterMode) {
			this.form.controls["confirmPassword"].setValidators([
				Validators.required,
			]);
		} else {
			this.form.controls["confirmPassword"].clearValidators();
		}
		this.form.controls["confirmPassword"].updateValueAndValidity();
	}

	// Umschalten zwischen Login und Registrierung
	toggleMode(): void {
		this.isRegisterMode = !this.isRegisterMode;
		this.updateValidators();
	}

	// Logik bei Formular-Submit
	onSubmit(): void {
		if (this.isRegisterMode) {
			if (this.form.value.password !== this.form.value.confirmPassword) {
				toasterService.add({
					severity: "error",
					summary: "Error",
					detail: "Passwörter stimmen nicht überein",
				});
				return;
			}
			console.log(
				"Registrieren:",
				this.form.value.username,
				this.form.value.password,
			);
			console.log("form data", this.form.value);
			this.http.post("/api/register", this.form.value).subscribe({
				next: (respone: any) => {
					console.log("response", respone);
				},
				error: (error: HttpErrorResponse) => {
					console.error("error", error);
					toasterService.addHttpError("Failed to register user", error);
				},
			});
		} else {
			console.log("Login:", this.form.value.username, this.form.value.password);
		}
	}
}
