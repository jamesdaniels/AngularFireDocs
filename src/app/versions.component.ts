import { Component, OnInit } from '@angular/core';
import { TSDocService } from './tsdoc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css']
})
export class VersionsComponent implements OnInit {

  constructor(
    public tsdocs: TSDocService,
    public router: Router
  ) {
    
  }

  ngOnInit() {
  }

  changeVersion(newVersion) {
    this.tsdocs.currentPath.subscribe(currentPath => {
      if (currentPath) {
        const type = (currentPath[0] as any).title;
        const component = (currentPath[1] as any);
        const componentName = component && component.name || null;
        this.router.navigateByUrl([newVersion, type, componentName].filter(a => a).join('/'));
      } else {
        this.router.navigateByUrl(`/${newVersion}`);
      }
    });
  }

}
