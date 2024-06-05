import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private http: DataService, private router: Router){
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
  user: User = new User;
  ngOnInit(): void {
    this.http.getUserLogged().subscribe((data)=>{
      this.user = data;
    })
  }
  savePassword(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      alert('Toate câmpurile sunt obligatorii.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Parola nouă și confirmarea parolei nu se potrivesc.');
      return;
    }

    // Logica pentru salvarea noii parole
    // Aici ar trebui să interacționați cu serviciul care gestionează autentificarea utilizatorilor
    console.log('Parola a fost schimbată cu succes!');
  }
  
}
