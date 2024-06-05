import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './component/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './component/register/register.component';
import { Lab1Component } from './component/lab1/lab1.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProfilComponent } from './component/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,
    Lab1Component,
    SettingsComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxFileDropModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

