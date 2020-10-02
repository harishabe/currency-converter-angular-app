import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { CurrencyExchangeService } from 'src/app/shared/services/currency-exchange.service';
import { ExchangeRates } from 'src/app/shared/interfaces/exchange-rates';
import { FormControl } from '@angular/forms';
import { Currency } from 'src/app/shared/enum/currency';
import {
  MatTableDataSource
} from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  displayedColumns: string[] = ['currency', 'rate'];
  dataSource: MatTableDataSource<MappedCurrencyRate>;
  baseCurrencyControl = new FormControl(Currency.EUR);
  currencyRate = [];
  isLoading=true;
  constructor(private currencyExchangeService: CurrencyExchangeService, private apiService: ApiService) {
    this.getCurrencyRate();
  }

  ngOnInit(): void {
  }

  getCurrencyRate() {
    this.apiService.getAmount().subscribe((exchangeRates: any) => {
      this.currencyExchangeService.exchangeRates = this.mapExchangeRatesResponseData(
        exchangeRates
      );
      this.dataSource = new MatTableDataSource(
        this.currencyExchangeService.exchangeRates
      );
      this.isLoading = false;
    }, (err) => {
      console.log('res', err);
    });
  }

  private mapExchangeRatesResponseData(
    responseData: ExchangeRates
  ): MappedCurrencyRate[] {
    const mappedRates = Object.keys(responseData.rates).map(
      (item: string): MappedCurrencyRate => {
        return {
          currency: item,
          rate: responseData.rates[item]
        };
      }
    );

    const baseRate = mappedRates.find(
      cRate => cRate.currency === responseData.base
    );
    if (!baseRate) {
      mappedRates.push({ currency: responseData.base, rate: 1 });
    }

    return mappedRates;
  }

  applySearchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
