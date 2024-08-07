import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Product } from 'app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, ProductService } from 'app/core/services';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
    categories:Category[]=[]
    updateForm!:FormGroup;
    @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
    constructor(
      private formBuilder:FormBuilder,
      private productService:ProductService,
      private categoryService:CategoryService){}

      getCategoryList(){
        this.categoryService.getAll().subscribe(result=>{
          this.categories=result.data
        })
      }
    createUpdateForm(product:Product){
      this.updateForm=this.formBuilder.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
      })
    }
    onSubmit(){
      if(!this.updateForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let product:Product=Object.assign({},this.updateForm.value);
      this.productService.update(product).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".edit-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
}
