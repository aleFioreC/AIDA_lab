import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/advanced/about/about.component';
import { ContactComponent } from './component/advanced/contact/contact.component';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ResearchComponent } from './component/advanced/research/research.component';
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
import { EditPeopleComponent } from './component/advanced/private-section/edit-people/edit-people.component';
import { NewsComponent } from './component/advanced/news/news.component';
import { PeopleDetailComponent } from './component/advanced/people/people-detail/people-detail.component';
import { PeopleComponent } from './component/advanced/people/people.component';
import { ThesisComponent } from './component/advanced/thesis/thesis.component';
import { ThesisDetailComponent } from './component/advanced/thesis/thesis-detail/thesis-detail.component';
import { ThesisResolver } from './model/resolver/thesis.resolver';
import { EditThesisComponent } from './component/advanced/private-section/edit-thesis/edit-thesis.component';
import { P101Component } from './component/advanced/p101/p101.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'research', component: ResearchComponent },
  {
    path: 'research/:id',
    component: ResearchDetailComponent,
    resolve: { research: ResearchResolver }
  },
  { path: 'thesis', component: ThesisComponent },
  {
    path: 'thesis/:id',
    component: ThesisDetailComponent,
    resolve: { thesis: ThesisResolver }
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent,
    resolve: { news: NewsResolver }
  },
  {
    path: 'people/:id',
    component: PeopleDetailComponent,
    resolve: { people: PeopleResolver }
  },
  { path: 'p101', component: P101Component },
  { path: 'publication', component: PublicationComponent },
  { path: 'people', component: PeopleComponent },
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
  {
    path: 'edit-people/:id',
    component: EditPeopleComponent,
    resolve: { people: PeopleResolver }
  },
  {
    path: 'edit-thesis/:id',
    component: EditThesisComponent,
    resolve: { thesis: ThesisResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
