import { Component, OnInit } from '@angular/core';
import { TSDocService } from './tsdoc.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(public tsdocs: TSDocService) {

  }

  ngOnInit() {
  }

}
