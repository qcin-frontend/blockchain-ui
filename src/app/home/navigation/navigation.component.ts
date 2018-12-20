import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() info:any;
  navArray: any = [];

  constructor(private ProjectService: ProjectService, private router: Router) {}

  ngOnInit() {
    console.log(this.info);
    // console.log(this.info.data.parent.navigation);
    this.setNav(this.info);
    // home page for the dashboard
    this.ProjectService.get_float_accounts();
    this.ProjectService.setAction("Accounts");
    this.ProjectService.createNewFormElements(this.info.data.parent.navigation[0].createNewForm);

  }

  setNav(info){
    if(info.role) {
      this.navArray = this.info.data.parent.navigation;
    } else {
      this.navArray = this.info.data.child.navigation;
    }
  }
  logout(){
    this.ProjectService.logout();
  }

  navButton(action) {

    for(let i = 0; i< this.navArray.length; i++) {
      if(action === this.navArray[i].data) {
        this.ProjectService.createNewFormElements(this.navArray[i].createNewForm);
      }
    }

    if(action=="Accounts") {
      this.ProjectService.get_float_accounts();
      this.ProjectService.setAction(action);


      // this.ProjectService.createNewFormElements(this.navArray.createNewForm);

    } if(action=="Assets") {
      this.ProjectService.get_assets();
      this.ProjectService.setAction(action);
    } if(action=="Child") {
      this.ProjectService.get_Children();
      this.ProjectService.setAction(action);
    } if(action=="Search") {
      this.ProjectService.get_search();
      this.ProjectService.setAction(action);
    }

  }

}
