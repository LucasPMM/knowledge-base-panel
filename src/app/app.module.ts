import { UtilsService } from './providers/utils/utils.service';
// Angular Modules
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Other Modules
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ToasterModule } from 'angular2-toaster';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Component
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// Parts
import { DashComponent } from './parts/dash/dash.component';

//  Pages
import { LoginComponent } from './pages/login/login.component';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { KnowledgesListComponent } from './pages/knowledges-list/knowledges-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';

// Router config
import { AppRoutingModule } from './app-routing.module';

// Services
import { AdminService } from './providers/admin/admin.service';
import { LoginService } from './providers/login/login.service';

// Guards
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

// Configurations Files
import { environment } from 'environments/environment';

// Ngrx
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducers } from './stores/reducers';
import { effects } from './stores/effects';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StatisticsComponent } from './pages/statistics/statistics.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { language: ['selectedLanguageValue'] },
      { auth: ['loggedUser', 'userDataToRegister'] }
    ],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashComponent,
    ForgotPasswordComponent,
    LoaderComponent,
    ContentLoaderComponent,
    AdminListComponent,
    KnowledgesListComponent,
    LoginComponent,
    ContactComponent,
    InstitutionalComponent,
    TableComponent,
    PaginationComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    BootstrapModalModule,
    FileUploadModule,
    ToasterModule.forRoot(),
    QuillModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers, }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  entryComponents: [],
  providers: [
    UtilsService,
    AdminService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    Object.defineProperty(applicationRef, '_rootComponents', {get: () => applicationRef['components']});
  }
}
