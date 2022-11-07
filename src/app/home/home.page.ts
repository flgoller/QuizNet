import { Component, OnInit } from '@angular/core';
import { StudySetsService } from '../_services/study-sets.service';
import { StudySet } from '../_types/studySet';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  studySets?: StudySet[];
  currentStudySet?: StudySet;
  currentIndex = -1;
  title = '';

  constructor(private studySetService: StudySetsService) { }

  ngOnInit(): void {
    this.retrieveStudySets();
  }

  refreshList(): void {
    this.currentStudySet = undefined;
    this.currentIndex = -1;
    this.retrieveStudySets();
  }

  retrieveStudySets(): void {
    this.studySetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.studySets = data;
    });
  }

  setActiveStudySet(studySet: StudySet, index: number): void {
    this.currentStudySet = studySet;
    this.currentIndex = index;
  }

}
