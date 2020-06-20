import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  constructor() { }

  @Output() searchChanged = new EventEmitter<string>();
  @ViewChild("searchInput") searchInput: ElementRef;

  ngOnInit(): void {
  }

  onChanged() {
    this.searchChanged.emit(this.searchInput.nativeElement.value);
  }

}
