import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';
import { AuthorComponent } from './component/advanced/author/author.component';
import { NewsComponent } from './component/advanced/news/news.component';
import { AboutComponent } from './component/advanced/about/about.component';
import { SettingsComponent } from './component/advanced/settings/settings.component';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ContactComponent } from './component/advanced/contact/contact.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'research', component: NewsComponent },
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
