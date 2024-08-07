import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/core/services';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {
    updateForm!:FormGroup;
    @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
    constructor(
      private formBuilder:FormBuilder,
      private categoryService:CategoryService){}

    createUpdateForm(category:Category){
      this.updateForm=this.formBuilder.group({
        id:[category.id,Validators.required],
        name:[category.name,Validators.required],
      })
    }
    onSubmit(){
      if(!this.updateForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let category:Category=Object.assign({},this.updateForm.value);
      this.categoryService.update(category).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".edit-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
}
