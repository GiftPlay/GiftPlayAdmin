import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  faPlus = faPlus;
  faSearch = faSearch;
  productUrl = 'https://pmiii.livelyplant-c431bc65.eastus.azurecontainerapps.io/v1/gift-card';
  itemsArray: IProduct | any;

  constructor(private http:HttpClient){
    this.callProductUrl;
  }
  ngOnInit() {
    this.callProductUrl();
  }

  callProductUrl() {
    this.http.get(this.productUrl).subscribe(result => this.itemsArray = result);
  }

  editItem(index:number) {
    console.log(index);
  }
}

type IProduct = {
  id: number,
  company: string,
  cardNumber: string,
  description: string
  image: string,
  price: number
}
