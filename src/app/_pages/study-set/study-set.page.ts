import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { StudySetsService } from '../../_services/study-sets.service';
import { StudySet } from '../../_types/studySet';

@Component({
  selector: 'app-study-set',
  templateUrl: './study-set.page.html',
  styleUrls: ['./study-set.page.scss'],
})
export class StudySetPage implements OnInit {

  key: string;
  studySet: StudySet;

  constructor(
    private route: ActivatedRoute,
    private studySetService: StudySetsService,
    private navCtrl: NavController) {
    this.studySetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.studySet = data.filter(x => x.Key == this.key)[0];
    });

    this.route.params.subscribe(params => {
      this.key = params['key'];
    })
  }

  ngOnInit() { }

  goBack() {
    console.log("Back")
    this.navCtrl.back();
  }
}
