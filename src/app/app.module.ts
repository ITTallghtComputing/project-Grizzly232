import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './../_helpers/fake-backend';
import { JwtInterceptor } from './../_helpers/jwt.interceptor';
import { ErrorInterceptor } from './../_helpers/error.interceptor'
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { UserComponent } from './user/user.component';
import { Session } from './session/session.component';
import { Swim } from './swim/swim.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SwimFormComponent } from './swim-form/swim-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MealTrackerComponent } from './meal-tracker/meal-tracker.component';
import { MealComponent } from './meal/meal.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './../_helpers/auth.guard';
import { DayViewComponent } from './day-view/day-view.component';
import { DayDetailComponent } from './day-detail/day-detail.component'
import { AgGridModule } from 'ag-grid-angular';
import { ForumComponent } from './forum/forum.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sessions', component: SessionListComponent },
  { path: 'tracker', component: MealTrackerComponent },
  { path: 'day/:date', component: DayDetailComponent },
  { path: 'forum/:category', component: ForumComponent},
  { path: 'forum', component: ForumListComponent},
  { path: 'post/:postId', component: PostComponent},
  //keep this one at the bottom
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    Session,
    Swim,
    SessionListComponent,
    SwimFormComponent,
    DashboardComponent,
    MealTrackerComponent,
    MealComponent,
    MealFormComponent,
    CalendarComponent,
    HomeComponent,
    LoginComponent,
    DayViewComponent,
    DayDetailComponent,
    ForumComponent,
    ForumListComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'SwimApp'),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    AgGridModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SwimFormComponent]
})
export class AppModule { }
