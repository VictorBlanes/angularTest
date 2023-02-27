import {Component, Input} from "@angular/core";

@Component({
  selector:'app-point-item',
  templateUrl:'./point-item.component.html',
  styleUrls:['./point-item.component.scss']
})
export class PointItemComponent{
  @Input() inputText: string | undefined;
}
