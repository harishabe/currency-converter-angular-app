import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { SearchHistoryModule } from './search-history/search-history.module';

const routes: Routes = [
  { path: '', redirectTo: '/exchange-rates', pathMatch: 'full' },
  { path: 'currency-converter/:from/:to', loadChildren: () => CurrencyConverterModule },
  { path: 'exchange-rates', loadChildren: () => ExchangeRatesModule },
  { path: 'search-history', loadChildren: () => SearchHistoryModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
