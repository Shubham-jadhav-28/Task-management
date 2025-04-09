import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { TaskDetailsComponent } from './task-details/task-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'project',component:ProjectComponent},
    {path:'project-list',component:ProjectListComponent},
    { path: 'task-list', component: TaskListComponent },
   
    {path:'task-details',component:TaskDetailsComponent}
]
