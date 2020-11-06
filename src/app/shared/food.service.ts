import { Injectable } from '@angular/core';
import { Food } from '../shared/food';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
// 	food_type
// kcal_per_unit
// protein
// carbohydrates
// fat

	foodRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

    // Create
  createBooking(apt: Food) {
    return this.foodRef.push({
      food_type: apt.food_type,
      kcal_per_unit: apt.kcal_per_unit,
      protein: apt.protein,
      carbohydrates: apt.carbohydrates,
      fat: apt.fat
    })
  }

  getFoodList() {
    this.foodRef = this.db.list('/foods');
    
    return this.foodRef;
  }
}
