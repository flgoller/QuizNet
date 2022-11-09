import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { QuestionsService } from 'src/app/_services/questions.service';
import { Question } from 'src/app/_types/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {

  isEditing: boolean = false;
  public editQuestionForm: FormGroup;
  @Input() question: Question;
  @ViewChild(IonModal) modal: IonModal;

  constructor(private questionsService: QuestionsService) {
    this.editQuestionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  editQuestion() {
    this.modal.present()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  updateQuestion() {
    this.questionsService.update(this.question.Key, this.question)
    this.editQuestionForm.reset()

    this.isEditing = false;
    this.modal.dismiss(null, 'confirm');
  }
}
