import { Component, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-sidebar',
  standalone: true,
  templateUrl: './catalog-sidebar.component.html',
  styleUrls: ['./catalog-sidebar.component.css'],
})
export class CatalogSidebarComponent {
  @Output() categorySelected: EventEmitter<string> = new EventEmitter();
  onCategorySelect(category: string) {
    this.categorySelected.emit(category);
  }

}
