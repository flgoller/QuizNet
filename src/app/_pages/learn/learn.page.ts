import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { QuestionsService } from 'src/app/_services/questions.service';
import { StudySetsService } from 'src/app/_services/study-sets.service';
import { Question } from 'src/app/_types/question';
import { StudySet } from 'src/app/_types/studySet';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {

  constructor(private route: ActivatedRoute, private studySetService: StudySetsService, private navCtrl: NavController, private questionsService: QuestionsService) { }
  studySetKey: string;
  studySet: StudySet;
  questions?: Question[]
  index: number = 0;
  showResult:boolean = false;
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  test = this.route.params.subscribe(params => {
    this.studySetKey = params['key'];
  })

  goBack() {
    console.log("Back")
    this.navCtrl.back();
  }

  showQuestions() {
    console.log(this.questions)
  }

  ngOnInit() {
    console.log(this.studySetKey)
    this.studySetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.studySet = data.filter(x => x.Key == this.studySetKey)[0];
    });

    this.retrieveQuestions()
  }

  retrieveQuestions(): void {
    this.questionsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.questions = data.filter(x => x.StudySetKey == this.studySetKey);
    });
  }

  correct() {
    this.index++;
    this.correctAnswers++;
    this.showResult = this.index == this.questions?.length
  }

  incorrect() {
    this.index++;
    this.incorrectAnswers++;
    this.showResult = this.index == this.questions?.length
  }

}
