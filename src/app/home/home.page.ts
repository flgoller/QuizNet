import { Component, OnInit } from '@angular/core';
import { StudySetsService } from '../_services/study-sets.service';
import { StudySet } from '../_types/studySet';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { QuestionsService } from '../_services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  studySets?: StudySet[];
  title = '';

  constructor(private studySetService: StudySetsService, private router: Router, private questionsService : QuestionsService) { }

  ngOnInit(): void {
    console.log("retrive study set")
    this.retrieveStudySets();
  }

  refreshList(): void {
    this.retrieveStudySets();
  }

  deleteStudySet(key:string){
    this.studySetService.delete(key);

    this.questionsService.deleteAllFromStudySet(key);

    this.router.navigate(['./'])
  }

  retrieveStudySets(): void {
    this.studySetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.studySets = data;
    });
  }
  openStudySet(key: string) {
    console.log("open study set " + key)
    this.router.navigate(['/studySet', key])
  }
}
