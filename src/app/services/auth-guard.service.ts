import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastController: ToastController
  ){ }


   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {



      this.PopThis();
      this.router.navigate(['login']);
    }

    return true;
  }

  async PopThis(){


    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message: 'Access Denied, Login is Required to Access This Page!'
    });

    await toast.present();
  }
  
}