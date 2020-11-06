import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { FoodService } from '../shared/food.service';
import { MyfoodService } from '../shared/myfood.service';
import { Food } from '../shared/food';
import { Myfood } from '../shared/myfood';
import { AuthenticationService } from "../shared/authentication.service";

//MyfoodService
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

public foods;
public myfoods;
public title;
public show = true;
public carbs = 0;
public fats = 0;
public protein = 0;

  constructor(private auth: AuthenticationService, 
    private foodService:FoodService, 
    private myfoodService:MyfoodService,  
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.today();
    let user = this.auth.user.uid;
  	    let bookingRes = this.foodService.getFoodList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.foods = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.foods.push(a as Food);
        // console.log(a);
      })
    });

    let myFoodRes = this.myfoodService.getFoodList(user);
    myFoodRes.snapshotChanges().subscribe(res => {
      this.myfoods = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.myfoods.push(a);

        this.protein = this.protein + a['nutrition']['protein'];
        this.carbs = this.carbs + a['nutrition']['carbohydrate'];
        this.fats = this.fats + a['nutrition']['fat'];
        // console.log(a);
      })
    })

  }
  formSubmit(){
    // alert("submitted");
  }
  back(){
    this.show = true;
    this.today();
    
  }
  async add(item){
    delete item['$key'];
    let me = {user: this.auth.user.uid};
    item.user = this.auth.user.uid;
    console.log(item);

      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Food added succefully'
      });

      await toast.present();

    this.myfoodService.createMyFood(item);
  }

  addFood(){
    this.show=false;
    this.title = "Add Food to plate"

  }
  async deleteMyfood(key){
    this.myfoodService.removeFoos(key);

      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Food deleted succefully'
      });

      await toast.present();
  }

  today(){
    let date = new Date();
    let today = date.getDay();
    var weekday = [];
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    this.title=weekday[today];
  }

}
