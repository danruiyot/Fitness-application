import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

	userRef: AngularFireList<any>;
  
  myUserRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getUser(user){
  	this.userRef = this.db.list('/profile', ref => ref.orderByChild('user').equalTo(user));
    
    return this.userRef;
  }
    createUser(item){
    return this.userRef.push(item)
  	
  }
   updates(key,item){
    return this.userRef.update(key,item);
  	
  }
}
