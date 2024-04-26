import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    const username = this.userForm.value.username;
    const password = this.userForm.value.password;

    if (username && password) {
      this.authService.login(username, password).subscribe({
        next: (loggedIn) => {
          if (loggedIn) {
            console.log("Login exitoso");
            this.router.navigate(['/home']);
          } else {
            console.error("Error en el usuario o contraseña");
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error("Por favor, complete todos los campos");
    }
  }


}
