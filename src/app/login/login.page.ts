import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastController: ToastController

  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.PopThisSucc('login success');
          this.router.navigate(['profile']);

        } else {
          this.PopThis('Email is not verified');
          return false;
        }
      }).catch((error) => {
        this.PopThis(error.message);
        // window.alert(error.message)
      });
  }
  async PopThis(message){


    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message
    });

    await toast.present();
  }
    async PopThisSucc(message){


    const toast = await this.toastController.create({
      color: 'success',
      duration: 2000,
      message
    });

    await toast.present();
  }

}
