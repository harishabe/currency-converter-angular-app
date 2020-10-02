import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }
    getAmount() {
        return this.http.get('http://data.fixer.io/api/latest?access_key=54ca614ba67ae8cbfc0bc6bce096e15e');
    }


}
