import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/advanced/about/about.component';
import { AuthorComponent } from './component/advanced/author/author.component';
import { ContactComponent } from './component/advanced/contact/contact.component';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ResearchComponent } from './component/advanced/research/research.component';
import { SettingsComponent } from './component/advanced/settings/settings.component';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';
import { NewsResolver } from './resolver/news.resolver';
import { DashboardDetailComponent } from './component/basic/dashboard/dashboard-detail/dashboard-detail.component';
import { ResearchDetailComponent } from './component/advanced/research/research-detail/research-detail.component';
import { ResearchResolver } from './resolver/research.resolver';
import { PrivateSectionComponent } from './component/advanced/private-section/private-section.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'research', component: ResearchComponent },
  {
    path: 'research/:id',
    component: ResearchDetailComponent,
    resolve: { research: ResearchResolver }
  },
  {
    path: 'news/:id',
    component: DashboardDetailComponent,
    resolve: { news: NewsResolver }
  },
  { path: 'publication', component: PublicationComponent },
  { path: 'people', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'private', component: PrivateSectionComponent,
    children: [
      { path: '', redirectTo: 'private', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  {
    path: '*',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
