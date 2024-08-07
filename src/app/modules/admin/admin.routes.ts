import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { UserComponent } from "./user/user.component";
import { ServiceComponent } from "./service/service.component";
import { LeaveComponent } from "./leave/leave.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { OrderComponent } from "./order/order.component";
import { PhotoComponent } from "./photo/photo.component";

export default[
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:'appointments', component:AppointmentComponent},
    {path:'users', component:UserComponent},
    {path:'services', component:ServiceComponent},
    {path:'leaves', component:LeaveComponent},
    {path:'gallery', component:PhotoComponent},
    {path:'categories', component:CategoryComponent},
    {path:'products', component:ProductComponent},
    {path:'orders', component:OrderComponent}
] as Routes;
