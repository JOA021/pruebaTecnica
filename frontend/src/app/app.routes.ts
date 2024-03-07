import { Routes } from '@angular/router';
import { FirtsPageComponent } from './page/firts-page/firts-page.component';
import { RegisterComponent } from './page/register/register.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component'; 

export const routes: Routes = [
    {path: "", component: FirtsPageComponent},
    {path: "registro", component: RegisterComponent},
    {path: "nosotros", component: AboutUsComponent},
    {path: "admin", component: AdminPageComponent},
]
