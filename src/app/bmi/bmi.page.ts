import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication.service";
import { BmiService } from "../shared/bmi.service";

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.page.html',
  styleUrls: ['./bmi.page.scss'],
})
export class BmiPage implements OnInit {
  public bmis;

  constructor(public bmiservice: BmiService, 
    public authService: AuthenticationService, 
    private alertCtrl: AlertController, 
    public toastController: ToastController
    ) { }

  ngOnInit() {
    // console.log(this.authService.user.uid);
    // alert(this.authService.user.uid)
    // this.bmis = this.bmiservice.getBmis();

    let user = this.authService.user.uid;

       let bmiRes = this.bmiservice.getBmis(user);
    bmiRes.snapshotChanges().subscribe(res => {
      this.bmis = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.bmis.push(a);
        console.log(a);
      })
    })

  }
  
  async addBmi() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Calcula my BMI',
      inputs: [
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
            let comment, color = "";
            if (he.length && we.length ) {
              // code...
            let bmi = we/(he*he);
            let date =  new Date().toISOString().slice(0,10);
            if (bmi >= 30){
              comment = "dange";
            }else if (bmi < 30 && bmi >= 25) {
              comment = "over weight";
              color = "warning"
              // code...
            }else if (bmi < 25 && bmi >= 20) {
              comment = "Healthy";
              color = "success"

              // code...
            }else if (bmi < 20) {
              // code...
              comment = "Under weight";
              color = "dark"

            }

            var item ={bmi:bmi,color:color,comment:comment, todate:date, user: this.authService.user.uid};
          
            this.bmiservice.createBmi(item);

            console.log(this.bmis);
            this.success()
            }

          }
        }
      ]
    });

    await alert.present();



  }
  async delete(key){
     this.bmiservice.deleteBmi(key);


      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Bmi deleted succefully'
      });

      await toast.present();
  }
  async success(){
          const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Bmi added succefully'
      });

      await toast.present();
  }

}
