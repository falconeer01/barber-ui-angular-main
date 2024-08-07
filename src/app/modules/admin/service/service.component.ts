import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service } from 'app/core/models';
import { ServiceService } from 'app/core/services';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceUpdateComponent } from './service-update/service-update.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceAddComponent, ServiceUpdateComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit{
  services:Service[]=[]
  selectedService!:Service

  @ViewChild(ServiceAddComponent,{static:true}) addServiceComponent !: ServiceAddComponent;
  @ViewChild(ServiceUpdateComponent,{static:true})updateServiceComponent !: ServiceUpdateComponent;

  constructor(private serviceService:ServiceService){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.serviceService.getAll().subscribe(result=>{
      this.services=result.data;
    });
  }

  isImage(url:string|null){
    if(url==null || url==undefined) return false;
    if(url.split('.').length==1) return false;
    let allowedTypes=[".jpeg",".jpg",".png",".gif"]
    return allowedTypes.find(type=>url.includes(type))!=undefined
  }

  showAddModal(){
    this.addServiceComponent.createCreateForm();
  }

  showEditModal(service:Service|null){
    if(service==null) return;
    this.updateServiceComponent.createUpdateForm(service);
  }

  deleteServiceById(id:number){
    this.serviceService.deleteById(id).subscribe(result=>{
      this.getList();
    })
  }
}
