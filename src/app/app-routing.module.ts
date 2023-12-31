import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: '**',
    component: ProdutosComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
