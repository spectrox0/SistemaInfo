import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// routing
import { AppRoutingModule } from './app-routing.module';
// componentes
import { AppComponent } from './app.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { OrdenComponent } from './componentes/orden/orden.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CambiarComponent } from './componentes/cambiar/cambiar.component';
import { DireccionComponent } from './componentes/direccion/direccion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

// firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {ProductService} from './services/product.service';
import {ComprasService} from './services/compras.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    RegistroComponent,
    PrincipalComponent,
    AdministradorComponent,
    OrdenComponent,
    ComprasComponent,
    FooterComponent,
    EncabezadoComponent,
    MenuComponent,
    CambiarComponent,
    DireccionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'uMakeIT'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule ,
    FontAwesomeModule,
    FlashMessagesModule,
  ],
  providers: [AuthService ,
   ProductService ,
   ComprasService,
  AuthGuard ,
FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
