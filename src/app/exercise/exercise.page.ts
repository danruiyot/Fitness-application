import { Component, OnInit , ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { ExerciseService } from '../shared/exercise.service';
import { Exercise } from '../shared/exercise';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

public exercises;
public exercise;
safeSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private exerciseService: ExerciseService) { }

  ngOnInit() {
    let exerciseRef = this.exerciseService.getExerciseList();
    exerciseRef.snapshotChanges().subscribe(res => {
      this.exercises = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.exercises.push(a as Exercise);
        // console.log(a);
      })
    })

  }

  viewThis(item){
    // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(item.video);
    // // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(item.video);
    // this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.video);
    // console.log(this.safeSrc);
    this.exercise=item;
    this.exercise.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.video);

  }
    back(){

    this.exercise = null;
    
  }


}
