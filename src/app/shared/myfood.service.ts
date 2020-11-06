import { Injectable } from '@angular/core';
import { Myfood } from '../shared/myfood';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MyfoodService {
	foodRef: AngularFireList<any>;
  
  myFoodRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

    // Create
  createMyFood(food) {
    return this.foodRef.push(food)
  }

  getFoodList(user) {
    this.foodRef = this.db.list('/myfood', ref => ref.orderByChild('user').equalTo(user));
    
    return this.foodRef;
  }
  removeFoos(key) {
    this.myFoodRef = this.db.object('/myfood/' + key);
    this.myFoodRef.remove();
  }
}
