import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@erp-frontend/header';
import { SidebarComponent } from '../../../../../libs/src/lib/sidebar/sidebar.component';
import { FooterComponent } from '@erp-frontend/footer';

@Component({
	selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
	// Puedes agregar lógica aquí
}
