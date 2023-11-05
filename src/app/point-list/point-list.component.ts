import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {userComment} from "./model/userComment";
import {DatePipe} from "@angular/common";
import {ServerRequestsService} from "../shared/server-requests.service";

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})
export class PointListComponent implements OnInit {
  datepipe: DatePipe;
  serverRequestService: ServerRequestsService;

  numberOfComments: number = 0;
  readonly itemPerPage: number = 10;
  pageNumber: number = 0;
  userComments: userComment[];
  showedUserComments: userComment[];


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

  constructor(datePipe: DatePipe, serverRequestService: ServerRequestsService) {
    this.datepipe = datePipe;
    this.serverRequestService = serverRequestService;
  }

  ngOnInit() {
    this.serverRequestService.retrieveComments().subscribe(result => {this.userComments = result as userComment[]; this.changePage(this.pageNumber);});
  }

  addItem() {
    if (this.userCommentFormGroup.valid) {
      let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy H:mm');
      let userComment: userComment = {
        userName: this.userCommentFormGroup.get('userFormControl').value,
        message: this.userCommentFormGroup.get('userComment').value,
        date: currentDateTime
      }

      this.serverRequestService.makeComment(userComment).subscribe(result => console.log(result));
      this.changePage(this.pageNumber);
    }
  }

  changePage(currentPage: number) {
    this.numberOfComments = this.userComments.length;
    this.pageNumber = currentPage;
    let lastComment: number = Math.min(this.userComments.length, (currentPage + 1) * this.itemPerPage);
    this.showedUserComments = this.userComments.slice(currentPage * this.itemPerPage,
      lastComment);
  }
}
