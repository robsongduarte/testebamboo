import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule, LOCALE_ID } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { registerLocaleData, DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common'

import localePt from '@angular/common/locales/pt'

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { Okta } from './service/okta/okta.service';
import { AuthGuardService } from './guards/auth-guard.service';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localePt, 'pt')

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        NgxMaskModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
      Okta,
      AuthGuardService,
      DecimalPipe,
      CurrencyPipe,
      DatePipe,
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      { provide: LOCALE_ID, useValue: 'pt' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
