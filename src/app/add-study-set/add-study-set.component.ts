import { Component, OnInit,ViewChild  } from '@angular/core';
import { StudySetsService } from '../_services/study-sets.service';
import { StudySet } from '../_types/studySet';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-add-study-set',
  templateUrl: './add-study-set.component.html',
  styleUrls: ['./add-study-set.component.scss'],
})
export class AddStudySetComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  studySet: StudySet = new StudySet();
  submitted = false;

  constructor(private studySetService: StudySetsService) { }

  ngOnInit(): void {
  }

  saveStudySet(): void {
    this.studySetService.create(this.studySet).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
    this.modal.dismiss('confirm');
  }

  newStudySet(): void {
    this.submitted = false;
    this.studySet = new StudySet();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
