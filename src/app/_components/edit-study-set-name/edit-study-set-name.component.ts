import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudySetsService } from 'src/app/_services/study-sets.service';
import { StudySet } from 'src/app/_types/studySet';

@Component({
  selector: 'app-edit-study-set-name',
  templateUrl: './edit-study-set-name.component.html',
  styleUrls: ['./edit-study-set-name.component.scss'],
})
export class EditStudySetNameComponent implements OnInit {

  @Input() studySet: StudySet;
  isEditing: boolean = false;
  public editStudySetForm: FormGroup;

  constructor(private studySetsService: StudySetsService) {
    this.editStudySetForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit() { }

  editName() {
    this.isEditing = true;
  }

  cancel() {
    this.isEditing = false;
  }

  updateStudySet() {
    this.studySetsService.update(this.studySet.Key, { Name: this.editStudySetForm.get('name').value })
    this.editStudySetForm.reset()
    this.isEditing = false;
  }
}
