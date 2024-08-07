import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'app/core/services';
import { Leave } from 'app/core/models';

@Component({
  selector: 'app-leave-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-update.component.html',
  styleUrl: './leave-update.component.scss'
})
export class LeaveUpdateComponent {
    constructor(
        private formBuilder:FormBuilder,
        private leaveService:LeaveService
      ){}

      leaveForm!:FormGroup;

      @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

      updateLeaveForm(leave:Leave){
        this.leaveForm=this.formBuilder.group({
          id:[leave.id, Validators.required],
          userId:[leave.userId, Validators.required],
          startDate:[leave.startDate, Validators.required],
          endDate:[leave.endDate, Validators.required]
        })
      }

      onSubmit(){
        this.leaveForm.valid ? console.warn("Please check the form.","Warning") : console.log("aynen");

        let leave:Leave=Object.assign({}, this.leaveForm.value);

        this.leaveService.update(leave).subscribe(res=>{
          if(typeof document ==undefined) return;
          document.querySelector(".create-modal")?.classList.toggle("show");
          document.querySelector(".modal-backdrop")?.classList.toggle("show");
          this.onLoad.emit();
        })
      }
}
