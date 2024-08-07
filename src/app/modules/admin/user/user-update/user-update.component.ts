import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserForUpdateDto } from 'app/core/models';
import { UserService } from 'app/core/services';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent {
    updateForm!:FormGroup
    fileBase64:string=''
    @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
    constructor(
      private formBuilder:FormBuilder,
      private userService:UserService
    ){}

    createUpdateForm(user:User){
      this.updateForm=this.formBuilder.group({
        id:[user.id,Validators.required],
        firstName:[user.firstName,Validators.required],
        lastName:[user.lastName,Validators.required],
        email:[user.email,Validators.required]
      })
    }
    onSubmit(){
      if(!this.updateForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let userForUpdateDto:UserForUpdateDto=Object.assign({imageUrl:this.fileBase64},this.updateForm.value);
      this.userService.update(userForUpdateDto).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".edit-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
    onFileChange(event:any){
      let file = event.target.files[0];
      if (file) {
        let fileReader = new FileReader();
        fileReader.onloadend=()=>{
          this.fileBase64=fileReader.result as string;
        }
        fileReader.readAsDataURL(file)
      }
    }
}
