import { Component, OnInit,Input  } from '@angular/core';
import { map } from 'rxjs/operators';
import { QuestionsService } from '../../_services/questions.service';
import { Question } from '../../_types/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() studySetKey: string;
  questions?: Question[];
  title = '';

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.retrieveQuestions();
  }

  refreshList(): void {
    this.retrieveQuestions();
  }

  deleteQuestion(key:string){
    this.questionsService.delete(key)
  }

  retrieveQuestions(): void {
    this.questionsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.questions = data.filter(x => x.StudySetKey == this.studySetKey);
    });
  }
}
