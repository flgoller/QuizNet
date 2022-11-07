import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudySetPageRoutingModule } from './study-set-routing.module';

import { StudySetPage } from './study-set.page';
import { QuestionsComponent } from '../questions/questions.component';
import { AddQuestionComponent } from '../add-question/add-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudySetPageRoutingModule
  ],
  declarations: [StudySetPage, QuestionsComponent, AddQuestionComponent]
})
export class StudySetPageModule {}
