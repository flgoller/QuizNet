import { Injectable } from '@angular/core';
import { StudySet } from '../_types/studySet';
import {
    AngularFireList,
    AngularFireDatabase,
    AngularFireObject,
  } from '@angular/fire/compat/database';
import { getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudySetsService {
  
    private dbPath = '/studySets';

    studySetRef: AngularFireList<StudySet>;
  
    constructor(private db: AngularFireDatabase) {
      this.studySetRef = db.list(this.dbPath);
    }
  
    getAll(): AngularFireList<StudySet> {
      return this.studySetRef;
    }
  
    create(studySet: StudySet): any {
      studySet.CreatedOn = Math.floor(Date.now() / 1000).toString()
      studySet.CreatedBy = getAuth().currentUser.uid
      return this.studySetRef.push(studySet);
    }
  
    update(key: string, value: any): Promise<void> {
      return this.studySetRef.update(key, value);
    }
  
    delete(key: string): Promise<void> {
      return this.studySetRef.remove(key);
    }
  
    deleteAll(): Promise<void> {
      return this.studySetRef.remove();
    }
}