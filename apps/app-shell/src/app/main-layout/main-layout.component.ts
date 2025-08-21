import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '@erp-frontend/footer';
import { HeaderComponent } from '@erp-frontend/header';
import { SidebarComponent } from '../../../../../libs/src/lib/sidebar/sidebar.component';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../../../libs/src/lib/services/sidebar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, FooterComponent, HeaderComponent, SidebarComponent, RouterModule, HttpClientModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isSidebarOpen = true;

  constructor(private sidebarService: SidebarService, private router: Router){
    this.sidebarService.openSidebar$.subscribe(() => this.showSidebarOnCardClick());
	 
	this.router.events.subscribe(event => {
		if(event instanceof NavigationEnd){
			this.isSidebarOpen = !['/', 'home'].includes(event.urlAfterRedirects);
		}
  });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  showSidebarOnCardClick() {
    if (!this.isSidebarOpen) {
      this.isSidebarOpen = true;
    }
  }
}