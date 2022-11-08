import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './_pages/logout/logout.page';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToRoot = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => 
    import('./_pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'register',
    loadChildren: () => 
    import('./_pages/register/register.module').then(
      m => m.RegisterPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'home',
    loadChildren: () => 
    import('./_pages/home/home.module').then(
      m => m.HomePageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'learn/:key',
    loadChildren: () => 
    import('./_pages/learn/learn.module').then(
      m => m.LearnPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'studySet/:key',
    loadChildren: () => 
    import('./_pages/study-set/study-set.module').then(
      m => m.StudySetPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'logout',
    component: LogoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
