import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/advanced/about/about.component';
import { AuthorComponent } from './component/advanced/author/author.component';
import { ContactComponent } from './component/advanced/contact/contact.component';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ResearchComponent } from './component/advanced/research/research.component';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';
import { ResearchDetailComponent } from './component/advanced/research/research-detail/research-detail.component';
import { PrivateSectionComponent } from './component/advanced/private-section/private-section.component';
import { ResearchResolver } from './model/resolver/research.resolver';
import { NewsResolver } from './model/resolver/news.resolver';
import { LoginComponent } from './component/advanced/private-section/login/login.component';
import { InsertComponent } from './component/advanced/private-section/insert/insert.component';
import { EditNewsComponent } from './component/advanced/private-section/edit-news/edit-news.component';
import { NewsDetailComponent } from './component/advanced/news/news-detail/news-detail.component';
import { EditResearchComponent } from './component/advanced/private-section/edit-research/edit-research.component';
import { PeopleResolver } from './model/resolver/people.resolver';
import { AuthorDetailComponent } from './component/advanced/author/author-detail/author-detail.component';

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
    component: NewsDetailComponent,
    resolve: { news: NewsResolver }
  },
  {
    path: 'people/:id',
    component: AuthorDetailComponent,
    resolve: { people: PeopleResolver }
  },
  { path: 'publication', component: PublicationComponent },
  { path: 'people', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'private', component: PrivateSectionComponent
  },
  {
    path: 'insert', component: InsertComponent
  },
  {
    path: 'edit-news/:id',
    component: EditNewsComponent,
    resolve: { news: NewsResolver }
  },
  {
    path: 'edit-research/:id',
    component: EditResearchComponent,
    resolve: { research: ResearchResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
