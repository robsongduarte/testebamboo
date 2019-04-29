import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { Okta } from '../../service/okta/okta.service';
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), CommonModule
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ],
    providers: [Okta],
})
export class HomeModule { }
