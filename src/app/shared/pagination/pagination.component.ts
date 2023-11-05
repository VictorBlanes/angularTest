import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentItems: number;
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Output() newItemEvent = new EventEmitter<number>();

  nextPage() {
    this.currentPage + 1 > this.maxPages() ? null : this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.currentPage - 1 < 0 ? null : this.goToPage(this.currentPage - 1);
  }

  firstPage() {
    this.goToPage(0)
  }

  lastPage() {
    this.goToPage(Math.floor((this.currentItems / this.itemsPerPage) - 0.001));
  }

  jumpToPage(event: Event) {
    this.goToPage(Number((event.target as HTMLInputElement).value) - 1)
  }

  private goToPage(page: number) {
    this.currentPage = page;
    this.newItemEvent.emit(this.currentPage)
  }

  maxPages(): number {
    return Math.floor((this.currentItems / this.itemsPerPage) - 0.001);
  }
}
