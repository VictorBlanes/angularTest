import {Component, Input} from "@angular/core";
import {userComment} from "../model/userComment";

@Component({
  selector:'app-point-item',
  templateUrl:'./point-item.component.html',
  styleUrls:['./point-item.component.scss']
})
export class PointItemComponent{
  @Input() userComment: userComment;
}
