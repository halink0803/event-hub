import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { FeedsPage } from '../pages/feeds/feeds';
import { ForyouPage } from '../pages/foryou/foryou';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { TruncatePipe } from  '../pipes/truncate.pipe';
import { LocationPage } from '../pages/location/location';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    UserPage,
    FeedsPage,
    ForyouPage,
    EventDetailPage,
    TruncatePipe,
    LocationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    UserPage,
    FeedsPage,
    ForyouPage,
    EventDetailPage,
    LocationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
