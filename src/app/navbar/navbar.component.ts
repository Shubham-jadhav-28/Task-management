import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export  class NavbarComponent implements OnInit {
  username: string | null = null;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }
  


   isDarkMode = false;

   toggleDarkMode(): void {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
  }
  
   
  
  logout(): void {
    localStorage.removeItem('username');
    window.location.href = '/login'; 
}
}
