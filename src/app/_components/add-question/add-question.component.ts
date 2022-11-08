import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { QuestionsService } from '../../_services/questions.service';
import { Question } from '../../_types/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() studySetKey: string;


  question: Question = new Question();
  submitted = false;

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
  }

  saveQuestion(): void {
    this.questionService.create(this.question, this.studySetKey).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
    this.modal.dismiss('confirm');
  }

  newQuestion(): void {
    this.submitted = false;
    this.question = new Question();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
