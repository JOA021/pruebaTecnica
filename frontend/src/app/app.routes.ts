import { Routes } from '@angular/router';
import { FirtsPageComponent } from './page/firts-page/firts-page.component';
import { RegisterComponent } from './page/register/register.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component'; 
import { AddAdministratorComponent } from './page/add-administrator/add-administrator.component';
import { AddTeacherComponent } from './page/add-teacher/add-teacher.component';
import { AddStudentComponent } from './page/add-student/add-student.component';

export const routes: Routes = [
    {path: "", component: FirtsPageComponent},
    {path: "registro", component: RegisterComponent},
    {path: "nosotros", component: AboutUsComponent},
    {path: "admin", component: AdminPageComponent},
    {path: "addAdmin", component: AddAdministratorComponent},
    {path: "addTeacher", component: AddTeacherComponent},
    {path: "addStudent", component: AddStudentComponent},
]
