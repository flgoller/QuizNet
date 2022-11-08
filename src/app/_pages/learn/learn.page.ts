import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { StudySetsService } from 'src/app/_services/study-sets.service';
import { StudySet } from 'src/app/_types/studySet';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {

  constructor(private route: ActivatedRoute, private studySetService : StudySetsService, private navCtrl: NavController) { }
  key: string;
  studySet :StudySet;

  test = this.route.params.subscribe(params => {
    this.key = params['key']; 
  })
  
  goBack(){
    console.log("Back")
    this.navCtrl.back();
  }
  
  ngOnInit() {
    this.studySetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ Key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.studySet = data.filter(x=> x.Key == this.key)[0];
    });
  }

}
