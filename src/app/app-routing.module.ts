import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { DireccionComponent} from './componentes/direccion/direccion.component';
import { AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '' , redirectTo : '/login' , pathMatch: 'full' } ,
  {path: 'registro', component: RegistroComponent},
  {path: 'navegacion', component: NavegacionComponent},
  {path: 'encabezado', component: EncabezadoComponent},
  {path: 'login', component: PrincipalComponent},
  {path: 'menu', component: MenuComponent , canActivate: [AuthGuard] },
  {path: 'orden', component: OrdenComponent, canActivate: [AuthGuard]},
  {path: 'compras', component: ComprasComponent , canActivate: [AuthGuard] },
  {path: 'footer', component: FooterComponent},
  {path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard]},
  {path: 'cambiar', component: CambiarComponent, canActivate: [AuthGuard] },
  {path: 'direccion', component: DireccionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
