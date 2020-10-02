import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';

@Component({
  selector: 'app-conversion-detail',
  templateUrl: './conversion-detail.component.html',
  styleUrls: ['./conversion-detail.component.scss']
})
export class ConversionDetailComponent implements OnInit {
  @Input() amount: number;
  @Input() result: number;

  @Input() fromCurrencyRate: MappedCurrencyRate;
  @Input() toCurrencyRate: MappedCurrencyRate;

  fromCurrency: string;
  toCurrency: string;

  toRate: number;
  fromRate: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fromCurrency = this.fromCurrencyRate && this.fromCurrencyRate.currency;
    this.fromRate = this.fromCurrencyRate && this.fromCurrencyRate.rate;

    this.toCurrency = this.toCurrencyRate && this.toCurrencyRate.currency;
    this.toRate = this.toCurrencyRate && this.toCurrencyRate.rate;
    console.log('fromCurrency',this.fromCurrency)
  }

}
