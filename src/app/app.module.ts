import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
//Creados
import { JobPageModule } from './pages/job/job.module';
import { BuscarPageModule } from './pages-buscador/buscar/buscar.module';


//Admob free
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobService } from './services/publicidad/admob.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    JobPageModule,
    BuscarPageModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AdMobFree,
    AdmobService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
