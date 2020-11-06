import { Injectable } from '@angular/core';
import { Exercise } from '../shared/exercise';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


// exercise_type
// target_category
// description
// video_link

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
	exerciseRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  // Get List
  getExerciseList() {
    this.exerciseRef = this.db.list('/exercise/exercises');
    return this.exerciseRef;
  }

}
