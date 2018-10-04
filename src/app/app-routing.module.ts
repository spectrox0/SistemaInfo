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



const routes: Routes = [
  {path: '' , redirectTo : '/login' , pathMatch: 'full' } ,
  {path: 'registro', component: RegistroComponent},
  {path: 'navegacion', component: NavegacionComponent},
  {path: 'encabezado', component: EncabezadoComponent},
  {path: 'login', component: PrincipalComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'orden', component: OrdenComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'administrador', component: AdministradorComponent},
  {path: 'cambiar', component: CambiarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
