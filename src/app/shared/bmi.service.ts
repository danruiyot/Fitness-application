import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BmiService {

bmis: AngularFireList<any[]>
 myBmis: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

    createBmi(item) {
    	this.bmis.push(item);
  }

  getBmis(user){
  	this.bmis = this.db.list('/bmi', ref => ref.orderByChild('user').equalTo(user));
    
    return this.bmis;
  }
  deleteBmi(key): void {
  this.db.object('/bmi/' + key).remove();
	}
}
