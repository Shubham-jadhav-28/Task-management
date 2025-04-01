import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
],
  imports: [
    BrowserModule,FormsModule,  CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
