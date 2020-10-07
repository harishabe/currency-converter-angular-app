import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { SearchHistory } from 'src/app/shared/interfaces/search-history';
import { ApiService } from '../shared/services/api.service';
import { CurrencyExchangeService } from 'src/app/shared/services/currency-exchange.service';
import { Currency } from 'src/app/shared/enum/currency';
import { ExchangeRates } from 'src/app/shared/interfaces/exchange-rates';
import { FormNames } from 'src/app/shared/enum/form-names';
import {
  MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  currencyConverterForm: FormGroup;
  filteredFromCurrencies: Observable<string[]>;
  filteredToCurrencies: Observable<string[]>;

  fromCurrencyRate: MappedCurrencyRate;
  toCurrencyRate: MappedCurrencyRate;
  result: string;
  amount: number;

  isLoading = true;
  formNames = FormNames;
  searchHistory = [];
  dataSource: MatTableDataSource<SearchHistory>;

  constructor(
    private formBuilder: FormBuilder,
    private currencyExchangeService: CurrencyExchangeService,
    private route: ActivatedRoute,private apiService: ApiService) { }

  ngOnInit(): void {
    const baseCurrency =
      this.route.snapshot.paramMap.get('from') || Currency.EUR;
    const quoteCurrency =
      this.route.snapshot.paramMap.get('to') || Currency.HRK;

    this.currencyConverterForm = this.initForm(baseCurrency, quoteCurrency);
    this.getExchangeRates();

    this.filteredFromCurrencies = this.getFromValueChanges(
      FormNames.FromCurrency
    );
    this.filteredToCurrencies = this.getToValueChanges(FormNames.ToCurrency);
  }


  convert() {
    this.fromCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.FromCurrency).value
    );
    this.toCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.ToCurrency).value
    );
    this.amount = Math.floor(
      this.currencyConverterForm.get(FormNames.Amount).value
    );
    this.result = this.calculateExchangeRate(
      this.fromCurrencyRate && this.fromCurrencyRate.rate,
      this.toCurrencyRate && this.toCurrencyRate.rate
    );

    this.searchHistory.push(
      {
        'amount': this.amount, 'baseCurrency': this.fromCurrencyRate.currency,
        'toCurrency': this.toCurrencyRate.currency, 'convertedAmount': this.result, 'date': new Date()
      }
    )
    localStorage.searchHistory = JSON.stringify(this.searchHistory);
  }

  getFromValueChanges(formControlName: string): Observable<string[]> {
    return this.currencyConverterForm.get(formControlName).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(
          value,
          this.currencyExchangeService.fromCurrencies
        )
      )
    );
  }

  getToValueChanges(formControlName: string): Observable<string[]> {
    return this.currencyConverterForm.get(formControlName).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(value, this.currencyExchangeService.toCurrencies)
      )
    );
  }

  getExchangeRates() {
    this.apiService.getAmount().subscribe((exchangeRates: any) => {
      this.currencyExchangeService.exchangeRates = this.mapExchangeRatesResponseData(
        exchangeRates
      );
      this.currencyExchangeService.fromCurrencies = this.mapCurrencies();
      this.currencyExchangeService.toCurrencies = this.mapCurrencies();
      this.isLoading = false;
    }, (err) => {
      console.log('res', err);
    }, () => {
      this.isLoading = false;
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

  private initForm(fromCurrency: string, toCurrency: string) {
    return this.formBuilder.group({
      amount: [1, Validators.required],
      fromCurrency: [fromCurrency, Validators.required],
      toCurrency: [toCurrency, Validators.required]
    });
  }

  private mapCurrencies(): string[] {
    return this.currencyExchangeService.exchangeRates
      .map((currency: MappedCurrencyRate) => {
        return currency.currency;
      })
      .sort();
  }


  private filterCurrencies(value: string, arrayToFilter: string[]): string[] {
    const filterValueLowercase = value.toLowerCase();

    return arrayToFilter.filter(option =>
      option.toLowerCase().includes(filterValueLowercase)
    );
  }


  private filterSelectedValue(currencyCode: string): MappedCurrencyRate {
    return this.currencyExchangeService.exchangeRates.find(
      (item: MappedCurrencyRate) => {
        return item.currency === currencyCode;
      }
    );
  }

  private calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }

}
