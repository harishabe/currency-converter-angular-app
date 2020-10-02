import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';
import { MaterialModule } from './../material.module';
import { ConversionDetailComponent } from './conversion-detail/conversion-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CurrencyConverterComponent
    }
];

@NgModule({
    declarations: [CurrencyConverterComponent, ConversionDetailComponent],
    imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)]
})

export class CurrencyConverterModule { }
