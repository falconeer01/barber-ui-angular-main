import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'app/core/services';
import { Leave } from 'app/core/models';

@Component({
  selector: 'app-leave-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-add.component.html',
  styleUrl: './leave-add.component.scss'
})
export class LeaveAddComponent {
    constructor(
        private formBuilder:FormBuilder,
        private leaveService:LeaveService
      ){}

      leaveForm!:FormGroup;

      @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

      createLeaveForm(){
        this.leaveForm=this.formBuilder.group({
          userId:['', Validators.required],
          startDate:['', Validators.required],
          endDate:['', Validators.required]
        })
      }

      onSubmit(){
        if(!this.leaveForm.valid){
          console.warn("Please check the form.","Warning");
          return;
        }

        let leave:Leave=Object.assign({}, this.leaveForm.value);

        this.leaveService.createWithType(leave).subscribe(res=>{
          if(typeof document ==undefined) return;
          document.querySelector(".create-modal")?.classList.toggle("show");
          document.querySelector(".modal-backdrop")?.classList.toggle("show");
          this.onLoad.emit();
        })
      }
}
