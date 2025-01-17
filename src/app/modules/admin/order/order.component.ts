import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from 'app/core/services';
import { Order } from 'app/core/models';
import { OrderAddComponent } from './order-add/order-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderUpdateComponent } from './order-update/order-update.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, OrderAddComponent, FormsModule, ReactiveFormsModule, OrderUpdateComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
    constructor(private orderService:OrderService){}

    orders:Order[]=[];

    @ViewChild(OrderAddComponent, {static:true}) addOrderComponent!:OrderAddComponent;
    @ViewChild(OrderUpdateComponent, {static:true}) updateOrderComponent!:OrderUpdateComponent;

    getAll(){
      this.orderService.getAll().subscribe(res=>{
        this.orders = res.data;
      })
    }

    getAllDeleted(){
      this.orderService.getAllDeleted().subscribe(res=>{
        this.orders = res.data;
      });
    }

    getAllNotDeleted(){
      this.orderService.getAllNotDeleted().subscribe(res=>{
        this.orders = res.data;
      });
    }

    showAddModal(){
      this.addOrderComponent.createOrderForm();
    }

    showEditModal(order:Order){
      this.updateOrderComponent.updateOrderForm(order);
    }

    deleteOrderById(id:number){
      this.orderService.deleteById(id).subscribe();
      this.getAll();
    }

    hardDeleteById(id:number){
      this.orderService.hardDeleteById(id).subscribe();
      this.getAll();
    }

    restoreById(id:number){
      this.orderService.restoreById(id).subscribe();
    }

    ngOnInit(): void {
      this.getAll();
    }
}
