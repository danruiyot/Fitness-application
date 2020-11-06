import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


	recipeRef: AngularFireList<any>;
  recipeSinglegRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

    // Create
  createBooking(apt: Recipe) {
    return this.recipeRef.push({
      food_type: apt.food_type,
      recipe: apt.recipe,
      kcal_per_unit: apt.kcal_per_unit,
      prep_time: apt.prep_time
    })
  }

    getRecipe(id: string) {
    this.recipeSinglegRef = this.db.object('/recipes/recipe/' + id);
    return this.recipeSinglegRef;
  }

  getFoodList() {
    this.recipeRef = this.db.list('/recipes/recipe/');
    
    return this.recipeRef;
  }
}
