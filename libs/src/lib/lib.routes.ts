import { Route } from '@angular/router';
import { HomeComponent } from './home/home';
import { FooterComponent } from '../lib/footer/footer.component';

export const homeRoutes: Route[] = [{ path: '', component: HomeComponent}, { path: 'footer', component: FooterComponent }];
