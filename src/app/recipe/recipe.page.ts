import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

public recipes;
public recipe;

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {

  	let recipeRef = this.recipeService.getFoodList();
    recipeRef.snapshotChanges().subscribe(res => {
      this.recipes = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.recipes.push(a as Recipe);
        console.log(a);
      })
    })

  }
    view(item){
      let singlerecipeRef = this.recipeService.getRecipe(item);
      this.recipeService.getRecipe(item).valueChanges().subscribe(res => {
      console.log(res)
      this.recipe = res;
    })

  }
  back(){
  	this.recipe = null;
  }

}
