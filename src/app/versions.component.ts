import { Component, OnInit } from '@angular/core';
import { TSDocService } from './tsdoc.service';
import { ActivatedRoute } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css']
})
export class VersionsComponent implements OnInit {

  constructor(
    public tsdocs: TSDocService
  ) {
    
  }

  ngOnInit() {
  }

}
