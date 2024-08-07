import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Product } from 'app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, ProductService } from 'app/core/services';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
    categories:Category[]=[]
    createForm!:FormGroup

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
    createCreateForm(){
      this.getCategoryList();
      this.createForm=this.formBuilder.group({
        categoryId:['',Validators.required],
        name:['',Validators.required],
        description:['',Validators.required],
        tags:['',Validators.required],
        price:['',Validators.required],
        isActive:['',Validators.required],
      })
    }
    onSubmit(){
      if(!this.createForm.valid){
        console.warn("Please check the form.","Warning");
        return;
      }
      let product:Product=Object.assign({},this.createForm.value);
      this.productService.createWithType(product).subscribe(result=>{
        if(typeof document ==undefined) return;
        document.querySelector(".create-modal")?.classList.toggle("show");
        document.querySelector(".modal-backdrop")?.classList.toggle("show");
        this.onLoad.emit();
      })
    }
}
