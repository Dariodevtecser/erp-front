import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '@erp-frontend/footer';
import { HeaderComponent } from '@erp-frontend/header';
import { SidebarComponent } from '../../../../../libs/src/lib/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, FooterComponent, HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}