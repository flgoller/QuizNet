import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnPageRoutingModule } from './learn-routing.module';

import { LearnPage } from './learn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LearnPage]
})
export class LearnPageModule {}
