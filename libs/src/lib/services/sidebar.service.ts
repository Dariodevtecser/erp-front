import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  openSidebar$ = new Subject<void>();
  openSidebar() {
    this.openSidebar$.next();
  }
}