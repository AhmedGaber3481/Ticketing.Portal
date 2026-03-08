import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../services/translate.pipe';

@Component({
  selector: 'app-grid',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnChanges {

  @Input() pageSize!: number;
  pageIndex: number = 1;
  @Input() totalRows!: number;
  @Input() countPages!: number;
  pagingTitle? : string;
  displayedPages: any[] =[];
  sortKey?: string;
  sortDirection?: 'asc'|'desc';
  translationService = inject(TranslationService);

  @Output() pageLoadEvent = new EventEmitter<number>();

  renderPage(){
    console.log("rendering page", this.pageIndex, this.countPages);
    this.pageLoadEvent.emit(this.pageIndex);
  }

  nextPage(){
    if(this.pageIndex < this.countPages){
      this.pageIndex++;
      this.renderPage();
    }
  }

  previousPage(){
    console.log('Previous page clicked');
    if(this.pageIndex > 1){
      this.pageIndex--;
      this.renderPage();
    }
  }

  goToPage(index: number){
    this.pageIndex = index;
    this.renderPage();
  }

  ngOnChanges(changes: SimpleChanges){
    this.updatePaging();
  }

  updatePaging(){
    let start:number = (this.pageIndex - 1) * this.pageSize;
    this.pagingTitle = `Showing ${start + 1} to ${Math.min(start + this.pageSize, this.totalRows)} of ${this.totalRows}`;

    var showedPages = 5;
    var first = this.pageIndex - Math.floor(showedPages / 2);
    if(first <= 1)
      first = 1;
    var last = first + showedPages - 1;
    if(last >= this.countPages)
      last = this.countPages;

     this.displayedPages =[];
     for(var i = first; i<= last; i++){
      this.displayedPages.push(i);
     }
  }
}
