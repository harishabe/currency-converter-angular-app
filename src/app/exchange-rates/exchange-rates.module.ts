import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ExchangeRatesComponent } from './exchange-rates.component';
import { MaterialModule } from './../material.module';

const routes: Routes = [
    {
        path: '',
        component: ExchangeRatesComponent
    }
];

@NgModule({
    imports: [CommonModule,MaterialModule,RouterModule.forChild(routes)],
    declarations: [ExchangeRatesComponent]
})
export class ExchangeRatesModule { }
