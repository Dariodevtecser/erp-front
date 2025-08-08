
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SidebarComponent } from '@erp-frontend/sidebar';


@Component({
  imports: [RouterModule, ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'app-shell';
}
