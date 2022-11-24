import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { QuestionsService } from '../../_services/questions.service';
import { Question } from '../../_types/question';
import { ToastController } from '@ionic/angular';

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

  constructor(private questionService: QuestionsService,
    private toast: ToastController) { }

  ngOnInit(): void { }

  saveQuestion(): void {
    let minLength = 2;
    if(this.question.Question.length >= minLength && this.question.Answer.length >= minLength)
    {
      this.questionService.create(this.question, this.studySetKey).then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      });
      this.modal.dismiss('confirm');
    }
    else{
      this.toast.create({
        message: `Die Frage und die Antwort müssen mindestens ${minLength} Zeichen lang sein.`,
        color: 'danger',
        duration: 2000,
    })
        .then((toast) => toast.present());
    }
  }

  newQuestion(): void {
    this.submitted = false;
    this.question = new Question();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
