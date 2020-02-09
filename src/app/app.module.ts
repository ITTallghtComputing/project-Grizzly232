import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { UserComponent } from './user/user.component';
import { Session } from './session/session.component';
import { Swim } from './swim/swim.component';
import { SessionListComponent } from './session-list/session-list.component';

const appRoutes: Routes = [
  { path: 'sessions', component: SessionListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    Session,
    Swim,
    SessionListComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
