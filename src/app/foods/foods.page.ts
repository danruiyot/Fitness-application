import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FoodService } from '../shared/food.service';
import { MyfoodService } from '../shared/myfood.service';
import { Food } from '../shared/food';
import { Myfood } from '../shared/myfood';

import { AuthenticationService } from "../shared/authentication.service";
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {
  public foods;
  public food;
  public foodListBackup;

  constructor(
    private auth: AuthenticationService,
    private foodService: FoodService, 
    private myfoodService:MyfoodService,  
    public toastController: ToastController) { }

  ngOnInit() {
    const bookingRes = this.foodService.getFoodList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.foods = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.foods.push(a as Food);
        console.log(a);
    this.foodListBackup = this.foods;

      });
    });
  }
  async filterList(evt) {
    this.foods = this.foodListBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.foods = this.foods.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        // tslint:disable-next-line: max-line-length
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
      }
    });

    console.log(this.foods);
    console.log(searchTerm);

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



}
