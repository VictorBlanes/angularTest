import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {userComment} from "./model/userComment";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})
export class PointListComponent implements OnInit {
  datepipe: DatePipe;
  numberOfComments: number = 0;
  userComments: userComment[];

  userCommentFormGroup = new FormGroup({
    userFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userComment: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(1400)
    ])
  });

  constructor(datePipe: DatePipe) {
    this.datepipe = datePipe;
  }

  ngOnInit() {
    this.userComments = [];
  }

  addItem() {
    if (this.userCommentFormGroup.valid) {
      let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy H:mm');
      let userComment: userComment = {
        username: this.userCommentFormGroup.get('userFormControl').value,
        comment: this.userCommentFormGroup.get('userComment').value,
        commentDate: currentDateTime
      }
      this.userComments.push(userComment)
      this.numberOfComments = this.userComments.length;
    }
  }
}
