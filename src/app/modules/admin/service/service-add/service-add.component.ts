import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from 'app/core/models';
import { ServiceService } from 'app/core/services';

@Component({
  selector: 'app-service-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent {
    createForm!:FormGroup
    @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
    constructor(
      private formBuilder:FormBuilder,
      private serviceService:ServiceService){}

    createCreateForm(){
      this.createForm=this.formBuilder.group({
        name:['',Validators.required],
        duration:['',Validators.required],
        price:['',Validators.required]
      })
    }
    onSubmit(){
      if(!this.createForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let service:Service=Object.assign({},this.createForm.value);
      this.serviceService.createWithType(service).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".create-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
}
