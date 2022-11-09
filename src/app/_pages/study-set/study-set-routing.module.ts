import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudySetPage } from './study-set.page';

const routes: Routes = [
  {
    path: '',
    component: StudySetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudySetPageRoutingModule { }
