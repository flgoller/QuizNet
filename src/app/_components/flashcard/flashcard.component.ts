import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Question } from 'src/app/_types/question';
import { slideOpts } from './sliderOptions'


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  @Input() question: Question
  slideOpts = slideOpts;

  @ViewChild('flashcard') slides: IonSlides;

  swipeNext() {
    this.slides.slideNext();
  }

  swipeBack() {
    this.slides.slidePrev();
  }

  constructor() { }

  ngOnInit() { }

}
