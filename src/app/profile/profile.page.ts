import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ProfileService } from '../shared/profile.service';

import { AuthenticationService } from "../shared/authentication.service";
import { first } from 'rxjs/operators';
import { BmiService } from "../shared/bmi.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

public profile ;

  constructor(
    public bmiservice: BmiService, 
  	private profileService: ProfileService,
  	private auth : AuthenticationService,
  	private alertCtrl: AlertController, 
    public toastController: ToastController
  	) { }

  ngOnInit() {

		let singlerecipeRef = this.profileService.getUser(this.auth.user.uid);
		this.profileService.getUser(this.auth.user.uid).valueChanges().subscribe(res => {
		this.profile = res[0];
		// console.log(this.profile['$key']);

		if (this.profile.length === 0) {
			this.addProfile();
			// code...
		}
	});


  }
 async updateProfile(){
   	const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Create profile',
      inputs: [

        {
          name: 'username',
          type: 'text',
          id: 'username',
          value: this.profile.username,
          placeholder: 'Enter your Username'
        },

        {
          name: 'gender',
          type: 'text',
          id: 'gender',
          value: this.profile.gender,
          placeholder: 'Enter your gender'
        },
          {
          name: 'age',
          type: 'number',
          id: 'age',
          value: this.profile.age,
          placeholder: 'Enter your Age'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            let gender = alertData.gender;
            let username = alertData.username;
            let age = alertData.age;

              // code...

            var item2 ={gender:gender,age:age, username:username, user: this.auth.user.uid, email:this.auth.user.email};
          	let key = this.profile['$key'];

            this.profileService.updates(key, item2);

            this.success()

          }
        }
      ]
    });

    await alert.present();




      }

	async success(){
	  const toast = await this.toastController.create({
	color: 'dark',
	duration: 2000,
	message: 'Bmi added succefully'
	});

	await toast.present();
	}
async addProfile(){
   	const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Calcula my BMI',
      inputs: [

        {
          name: 'username',
          type: 'text',
          id: 'username',
          placeholder: 'Enter your Username'
        },

        {
          name: 'gender',
          type: 'text',
          id: 'gender',
          placeholder: 'Enter your gender'
        },

        {
          name: 'age',
          type: 'number',
          id: 'age',
          placeholder: 'Enter your age'
        },
        {
          name: 'weight',
          type: 'number',
          id: 'weight',
          placeholder: 'Enter your weight in kgs'
        },
        {
          name: 'height',
          type: 'number',
          id: 'height',
          placeholder: 'Enter your Height in meters'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            let we = alertData.weight;
            let he = alertData.height;
            let gender = alertData.gender;
            let username = alertData.username;
            let age = alertData.age;
            if (he.length && we.length ) {
              // code...
            let bmi = we/(he*he);
            let date =  new Date().toISOString().slice(0,10);

            var item ={bmi:bmi, todate:date, user: this.auth.user.uid};
            var item2 ={gender:gender, age:age, username:username, user: this.auth.user.uid, email:this.auth.user.email};
          
            this.profileService.createUser(item2);
            this.bmiservice.createBmi(item);
            console.log(item2)

            this.success()
            }

          }
        }
      ]
    });

    await alert.present();




      }

}
