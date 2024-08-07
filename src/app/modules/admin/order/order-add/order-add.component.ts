import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'app/core/services';
import { Order } from 'app/core/models';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss'
})
export class OrderAddComponent {
    constructor(
        private formBuilder:FormBuilder,
        private orderService:OrderService
      ){}

      orderForm!:FormGroup;

      @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

      createOrderForm(){
        this.orderForm=this.formBuilder.group({
          fullName:['', Validators.required],
          phoneNumber:['', Validators.required],
          email:['', Validators.required],
          cargoBranch:['', Validators.required],
          sendDate:['', Validators.required],
          sendCode:['', Validators.required],
          isSend:['', Validators.required],
          isCancel:['', Validators.required],
          cancelledAt:['', Validators.required],
          cancelledUser:['', Validators.required]
        })
      }

      onSubmit(){
        if(!this.orderForm.valid){
          console.warn("Please check the form.","Warning");
          return;
        }

        let order:Order=Object.assign({}, this.orderForm.value);

        this.orderService.createWithType(order).subscribe(res=>{
          if(typeof document ==undefined) return;
          document.querySelector(".create-modal")?.classList.toggle("show");
          document.querySelector(".modal-backdrop")?.classList.toggle("show");
          this.onLoad.emit();
        })
      }
}
