import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  ordersArray: IOrder | any;
  orderUrl = 'https://pmiii.livelyplant-c431bc65.eastus.azurecontainerapps.io/v1/order';
  openModal: boolean = false;
  public updateOrderForm = new FormGroup({
    nameModal: new FormControl(),
    valueModal:  new FormControl(),
    statusModal:  new FormControl(),
    phoneModal:  new FormControl(),
    dateModal:  new FormControl(),
    index: new FormControl()
  });

  constructor(private http:HttpClient) {
    this.ordersArray = new Array();
  }
  ngOnInit() {
    this.callOrdersUrl();
  }

  callOrdersUrl() {
    this.http.get(this.orderUrl).subscribe(result => {
      this.ordersArray = result
      this.editDate(this.ordersArray);
    });
  }

  updateOrder(index: number) {
    this.toggleModal();

    let nameModal;
    let valueModal;
    let statusModal;
    let phoneModal;
    let dateModal;


    setTimeout(() => {
      nameModal = document.getElementById("buyerNameModalId");
      valueModal = document.getElementById("valueModalId");
      statusModal = document.getElementById("statusModalId");
      phoneModal = document.getElementById("phoneModalId");
      dateModal = document.getElementById("dateModalId");

      nameModal?.setAttribute('value', this.ordersArray[index].buyerName);
      valueModal?.setAttribute('value', this.ordersArray[index].orderValue);
      statusModal?.setAttribute('value', this.ordersArray[index].orderStatus);
      phoneModal?.setAttribute('value', this.ordersArray[index].buyerPhone);
      dateModal?.setAttribute('value', this.ordersArray[index].formattedDate);

      this.updateOrderForm = new FormGroup({
        nameModal: new FormControl(this.ordersArray[index].buyerName),
        valueModal:  new FormControl(this.ordersArray[index].orderValue),
        statusModal:  new FormControl(this.ordersArray[index].orderStatus),
        phoneModal:  new FormControl(this.ordersArray[index].buyerPhone),
        dateModal:  new FormControl(this.ordersArray[index].formattedDate),
        index:  new FormControl(index),
      })
      }, 300);

    }

  editDate(arr: IOrder[]) {
    arr.forEach((item) => {
      const year = item.orderDate.substring(0, 4)
      const month = item.orderDate.substring(5, 7);
      const day = item.orderDate.substring(8, 10);

      const formattedDate = day + '/' + month + '/' + year;
      item.formattedDate = formattedDate;
    });
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  onSubmit() {
    const array = this.ordersArray[this.updateOrderForm.value.index];
    array.buyerName = this.updateOrderForm.value.nameModal;
    array.orderValue = this.updateOrderForm.value.valueModal;
    array.orderStatus = this.updateOrderForm.value.statusModal;
    array.buyerPhone = this.updateOrderForm.value.phoneModal;
    array.orderDate = convertDateToAPIFormat(this.updateOrderForm.value.dateModal);

    console.log(array);

    this.enviarChamadaHTTP(array);
    this.toggleModal();
    window.location.reload();
  }

  enviarChamadaHTTP(objetoDados: any): void {
    const url = this.orderUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(url, JSON.stringify(objetoDados), { headers }).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
      },
      (error) => {
        console.error('Erro na chamada da API:', error);
      }
    );
  }
}

interface IOrder {
  id: string,
  orderDate: string,
  buyerName: string,
  orderValue: number ,
  orderStatus: string,
  buyerPhone: string
  formattedDate: string;
}

function convertDateToAPIFormat(dateString: string): string {
  const [day, month, year] = dateString.split("/");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const formattedDate = date.toISOString();

  return formattedDate;
}

