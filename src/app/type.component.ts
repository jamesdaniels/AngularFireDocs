import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input() type: {};

  constructor() { }

  ngOnInit() {
  }

  ifObject(it) {
    return typeof it === "object";
  }

}
