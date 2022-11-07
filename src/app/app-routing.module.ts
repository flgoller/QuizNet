import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.page';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

// TODO: Standardverhalten definieren
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
    import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'register',
    loadChildren: () => 
    import('./register/register.module').then(
      m => m.RegisterPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'home',
    loadChildren: () => 
    import('./home/home.module').then(
      m => m.HomePageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'studySet/:key',
    loadChildren: () => 
    import('./study-set/study-set.module').then(
      m => m.StudySetPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'study-set',
    loadChildren: () => import('./study-set/study-set.module').then( m => m.StudySetPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
