import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export default class NavbarComponent {
  username: string | null = null;
  
  ngOnInit() {
     this.username = localStorage.getItem('username');
   
  }
  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
