import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'app/core/models';
import { ProductService } from 'app/core/services';
import { ProductAddComponent } from './product-add/product-add.component';
import { RouterLink } from '@angular/router';
import { ProductUpdateComponent } from './product-update/product-update.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductAddComponent, ProductUpdateComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    products:Product[]=[]
    selectedProduct!:Product

    @ViewChild(ProductAddComponent,{static:true}) addProductComponent !: ProductAddComponent;
    @ViewChild(ProductUpdateComponent,{static:true}) updateProductComponent !: ProductUpdateComponent;

    constructor(private productService:ProductService){}
    ngOnInit(): void {
      this.getList();
    }

    getList(){
      this.productService.getAll().subscribe(result=>{
        this.products=result.data;
      });
    }
    isImage(url:string|null){
      if(url==null || url==undefined) return false;
      if(url.split('.').length==1) return false;
      let allowedTypes=[".jpeg",".jpg",".png",".gif"]
      return allowedTypes.find(type=>url.includes(type))!=undefined
    }
    showAddModal(){
      this.addProductComponent.createCreateForm();
    }
    showEditModal(product:Product|null){
      if(product==null) return;
      this.updateProductComponent.createUpdateForm(product);
    }
    deleteProductById(id:number){
      this.productService.deleteById(id).subscribe(result=>{
        this.getList();
      })
    }
}
