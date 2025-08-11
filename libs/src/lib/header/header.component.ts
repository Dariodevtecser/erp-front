import { Component } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  selectedModule: string | null = null;

  constructor(private selectedService: SelectionService){
    this.selectedService.selectedModule$.subscribe(name => {
      this.selectedModule = name;
    })
  }
}