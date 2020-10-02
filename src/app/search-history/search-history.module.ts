import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SearchHistoryComponent } from './search-history.component';
import { MaterialModule } from './../material.module';

const routes: Routes = [
    {
        path: '',
        component: SearchHistoryComponent
    }
];

@NgModule({
    imports: [CommonModule,MaterialModule,RouterModule.forChild(routes)],
    declarations: [SearchHistoryComponent]
})
export class SearchHistoryModule { }
