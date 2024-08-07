import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/core/services';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
    createForm!:FormGroup
    @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
    constructor(
      private formBuilder:FormBuilder,
      private categoryService:CategoryService){}

    createCreateForm(){
      this.createForm=this.formBuilder.group({
        name:['',Validators.required]
      })
    }
    onSubmit(){
      if(!this.createForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let category:Category=Object.assign({},this.createForm.value);
      this.categoryService.createWithType(category).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".create-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
}
