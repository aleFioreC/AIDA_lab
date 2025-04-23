import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './component/basic/navbar/navbar.component';
import { FooterComponent } from './component/basic/footer/footer.component';
import { ModalDialogComponent } from './component/basic/modal-dialog/modal-dialog.component';
import { AboutComponent } from './component/advanced/about/about.component';
import { NewsComponent } from './component/advanced/news/news.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GenericTableComponent } from './component/basic/generic-table/generic-table.component';
import { DashboardComponent } from './component/basic/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './component/basic/spinner/spinner.component';
import { LoadingInterceptor } from './service/interceptor/loading.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ContactComponent } from './component/advanced/contact/contact.component';
import { MatSelectModule } from '@angular/material/select';
import { ResearchComponent } from './component/advanced/research/research.component';
import { ResearchDetailComponent } from './component/advanced/research/research-detail/research-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PrivateSectionComponent } from './component/advanced/private-section/private-section.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './component/advanced/private-section/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EditNewsComponent } from './component/advanced/private-section/edit-news/edit-news.component';
import { EditPeopleComponent } from './component/advanced/private-section/edit-people/edit-people.component';
import { EditResearchComponent } from './component/advanced/private-section/edit-research/edit-research.component';
import { NewsDetailComponent } from './component/advanced/news/news-detail/news-detail.component';
import { PeopleComponent } from './component/advanced/people/people.component';
import { PeopleDetailComponent } from './component/advanced/people/people-detail/people-detail.component';
import { TopNewsComponent } from './component/advanced/news/top-news/top-news.component';
import { ThesisComponent } from './component/advanced/thesis/thesis.component';
import { ThesisDetailComponent } from './component/advanced/thesis/thesis-detail/thesis-detail.component';
import { EditThesisComponent } from './component/advanced/private-section/edit-thesis/edit-thesis.component';
import { ConfirmDialogComponent } from './component/basic/confirm-dialog/confirm-dialog.component';
import { P101Component } from './component/advanced/p101/p101.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InsertNewsComponent } from './component/advanced/private-section/insert-news/insert-news.component';
import { InsertPeopleComponent } from './component/advanced/private-section/insert-people/insert-people.component';
import { InsertResearchComponent } from './component/advanced/private-section/insert-research/insert-research.component';
import { InsertThesisComponent } from './component/advanced/private-section/insert-thesis/insert-thesis.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcumbComponent } from './component/basic/breadcumb/breadcumb.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ModalDialogComponent,
    AboutComponent,
    NewsComponent,
    DashboardComponent,
    GenericTableComponent,
    SpinnerComponent,
    PublicationComponent,
    ContactComponent,
    ResearchComponent,
    ResearchDetailComponent,
    PrivateSectionComponent,
    LoginComponent,
    EditNewsComponent,
    EditPeopleComponent,
    EditResearchComponent,
    NewsDetailComponent,
    PeopleComponent,
    PeopleDetailComponent,
    TopNewsComponent,
    ThesisComponent,
    ThesisDetailComponent,
    EditThesisComponent,
    ConfirmDialogComponent,
    P101Component,
    InsertNewsComponent,
    InsertPeopleComponent,
    InsertResearchComponent,
    InsertThesisComponent,
    BreadcumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgbCarouselModule,
    NgbModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true,
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}