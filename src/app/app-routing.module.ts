import { LoginComponent } from './pages/login/login.component';
import { DashComponent } from './parts/dash/dash.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { KnowledgesListComponent } from './pages/knowledges-list/knowledges-list.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';


// TODO: Add Guards:
const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: '',
    component: DashComponent,
    children: [
      { component: AdminListComponent, path: 'admins' },
      { component: KnowledgesListComponent, path: 'knowledges' },
      { component: InstitutionalComponent, path: 'institucional' },
      { component: ContactComponent, path: 'contact' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
