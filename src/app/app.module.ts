import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BLOOD_BANK_REST_URL } from './app-rest.injection-token';

import { ApiSecretInterceptor } from './modules/core/interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: BLOOD_BANK_REST_URL,
      useValue: 'http://dev-bloodb.sevadev.com/admin/api',
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiSecretInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
