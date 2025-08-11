import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectionService {

  private selectedModuleSubject = new BehaviorSubject<string | null>(null);
  selectedModule$ = this.selectedModuleSubject.asObservable();

  setSelectedModule(module: string) {
    this.selectedModuleSubject.next(module);
  }
}