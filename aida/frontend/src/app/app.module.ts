import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatCard } from '@angular/material/card';
import { NavbarComponent } from './component/basic/navbar/navbar.component';
import { FooterComponent } from './component/basic/footer/footer.component';
import { ModalDialogComponent } from './component/basic/modal-dialog/modal-dialog.component';
import { AuthorComponent } from './component/advanced/author/author.component';
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
import { SettingsComponent } from './component/advanced/settings/settings.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './component/basic/spinner/spinner.component';
import { LoadingInterceptor } from './service/interceptor/loading.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { PublicationComponent } from './component/advanced/publication/publication.component';
import { ContactComponent } from './component/advanced/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ModalDialogComponent,
    AuthorComponent,
    AboutComponent,
    NewsComponent,
    DashboardComponent,
    GenericTableComponent,
    SettingsComponent,
    SpinnerComponent,
    PublicationComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
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
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
