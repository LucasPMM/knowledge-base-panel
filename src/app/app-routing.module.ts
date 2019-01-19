import { UnauthenticatedGuard } from './guards/unauthenticated/unauthenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashComponent } from './parts/dash/dash.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { KnowledgesListComponent } from './pages/knowledges-list/knowledges-list.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: '',
    component: DashComponent,
    canActivate: [AuthenticatedGuard],
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
