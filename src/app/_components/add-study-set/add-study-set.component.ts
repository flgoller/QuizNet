import { Component, OnInit, ViewChild } from '@angular/core';
import { StudySetsService } from '../../_services/study-sets.service';
import { StudySet } from '../../_types/studySet';
import { IonModal } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-study-set',
  templateUrl: './add-study-set.component.html',
  styleUrls: ['./add-study-set.component.scss'],
})
export class AddStudySetComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  studySet: StudySet = new StudySet();
  submitted = false;

  constructor(private studySetService: StudySetsService,
    private toast: ToastController,) { }

  ngOnInit(): void { }

  saveStudySet(): void {
    let minLength = 2;
    if(this.studySet.Name.length >= minLength)
    {
      this.studySetService.create(this.studySet).then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      });
      this.modal.dismiss('confirm');
    }
    else{
      this.toast.create({
        message: `Der Name muss mindestens ${minLength} Zeichen lang sein.`,
        color: 'danger',
        duration: 2000,
    })
        .then((toast) => toast.present());
    }
  }

  newStudySet(): void {
    this.submitted = false;
    this.studySet = new StudySet();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
