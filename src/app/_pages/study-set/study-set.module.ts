import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudySetPageRoutingModule } from './study-set-routing.module';

import { StudySetPage } from './study-set.page';
import { QuestionsComponent } from '../../_components/questions/questions.component';
import { AddQuestionComponent } from '../../_components/add-question/add-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditStudySetNameComponent } from 'src/app/_components/edit-study-set-name/edit-study-set-name.component';
import { EditQuestionComponent } from 'src/app/_components/edit-question/edit-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudySetPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StudySetPage,
    QuestionsComponent,
    AddQuestionComponent,
    EditStudySetNameComponent,
    EditQuestionComponent,
  ]
})
export class StudySetPageModule { }
