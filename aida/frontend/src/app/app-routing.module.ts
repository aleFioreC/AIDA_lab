import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';
import { AuthorComponent } from './component/advanced/author/author.component';
import { NewsComponent } from './component/advanced/news/news.component';
import { AboutComponent } from './component/advanced/about/about.component';
import { SettingsComponent } from './component/advanced/settings/settings.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'news', component: NewsComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
