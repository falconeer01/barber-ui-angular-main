import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'app/core/models';
import { UserService } from 'app/core/services';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, UserAddComponent, UserUpdateComponent, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
    users:User[]=[];
    selectedUser!:User;

    @ViewChild(UserAddComponent,{static:true}) addUserComponent !: UserAddComponent;
    @ViewChild(UserUpdateComponent,{static:true})updateUserComponent !: UserUpdateComponent;

    // dtOptions: DataTables.Settings = {};

    constructor(private userService:UserService){}

    ngOnInit(): void {
      this.getList();
    }

    /** @deprecated */
    // initializeDataTable(){
    //   this.dtOptions = {
    //     responsive:true,
    //     serverSide: true,     // Set the flag
    //     ajax: (dataTablesParameters: any, callback) => {
    //       this.userService.getAll().subscribe(result=>{
    //         callback({
    //           recordsTotal: result.data.length,
    //           recordsFiltered: '',
    //           data: result.data.map(user=>{
    //             let newUser=Object.assign(user,
    //               {
    //                 imageUrl:`<img src="${(this.isImage(user.imageUrl)?user.imageUrl:'/assets/images/avatar.png')}" width="50" height="50" >`
    //               })
    //               return newUser;
    //           })
    //         });
    //       })
    //     },
    //     columns: [{
    //       title: 'ID',
    //       data: 'id'
    //     },
    //     {
    //       title: 'Image',
    //       data: 'imageUrl',

    //     },
    //     {
    //       title: 'First name',
    //       data: 'firstName'
    //     },
    //     {
    //       title: 'Last name',
    //       data: 'lastName'
    //     },
    //     {
    //       title: 'Email',
    //       data: 'email'
    //     }]
    //   };
    // }

    getList(){
      this.userService.getAll().subscribe(result=>{
        this.users=result.data;
        // this.dtOptions.data=result.data.sort((a,b)=>{return b.id-a.id});
      });
    }

    getAllDeleted(){
      this.userService.getAllDeleted().subscribe(res=>{
        this.users = res.data;
      });
    }

    getAllNotDeleted(){
      this.userService.getAllNotDeleted().subscribe(res=>{
        this.users = res.data;
      });
    }

    isImage(url:string|null){
      if(url==null || url==undefined) return false;
      if(url.split('.').length==1) return false;
      let allowedTypes=[".jpeg",".jpg",".png",".gif"]
      return allowedTypes.find(type=>url.includes(type))!=undefined
    }

    showAddModal(){
      this.addUserComponent.createCreateForm();
    }

    showEditModal(user:User|null){
      if(user==null) return;
      this.updateUserComponent.createUpdateForm(user);
    }

    deleteUserById(id:number){
      this.userService.deleteById(id).subscribe(result=>{
        this.getList();
      })
    }

    hardDeleteById(id:number){
      this.userService.hardDeleteById(id).subscribe();
    }

    restoreById(id:number){
      this.userService.restoreById(id).subscribe();
    }
}
