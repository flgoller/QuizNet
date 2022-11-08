import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/_types/question';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  @Input() question: Question


  constructor() { }

  ngOnInit() {}

}
