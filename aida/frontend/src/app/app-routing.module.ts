import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/advanced/about/about.component';
import { AuthorComponent } from './component/advanced/author/author.component';
import { ContactComponent } from './component/advanced/contact/contact.component';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ResearchComponent } from './component/advanced/research/research.component';
import { SettingsComponent } from './component/advanced/settings/settings.component';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'people', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
