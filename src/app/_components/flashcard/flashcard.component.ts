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

  ngOnChanges(){
    this.slides.slideTo(0, 0);
  }

  swipeNext() {
    this.slides.slideNext(1000);
  }

  swipeBack() {
    this.slides.slidePrev(1000);
  }

  constructor() { }

  ngOnInit() { }

}
