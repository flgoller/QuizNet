import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Question } from '../_types/question';
import { getAuth } from "firebase/auth";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private dbPath = '/questions';

    questionRef: AngularFireList<Question>;
  
    constructor(private db: AngularFireDatabase) {
      this.questionRef = db.list(this.dbPath);
    }

    getAll(): AngularFireList<Question> {
      return this.questionRef
    }
  
    create(question: Question, studySetKey: string): any {
      question.CreatedOn = Math.floor(Date.now() / 1000).toString()
      question.CreatedBy = getAuth().currentUser.uid
      question.StudySetKey = studySetKey;
      return this.questionRef.push(question);
    }
  
    update(key: string, value: any): Promise<void> {
      return this.questionRef.update(key, value);
    }
  
    delete(key: string){
      console.log(this.questionRef.remove(key));
    }

    deleteAllFromStudySet(studySetKey:string){ // TODO
      let questionsFromStudySet;
      this.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        questionsFromStudySet = data.filter(x => x.StudySetKey == studySetKey);
      });
      this.db.database.refFromURL("/")

      for(let question of questionsFromStudySet){
        this.delete(question.Key);
      }
    }

    
  
    deleteAll(): Promise<void> {
      return this.questionRef.remove();
    }
}
