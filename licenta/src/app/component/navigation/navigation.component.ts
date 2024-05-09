import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faHouse } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  constructor(private http: DataService, private router: Router){}
  ngOnInit(): void {
    this.http.getUserLogged().subscribe((data)=>{
      this.userRole = data.functie;
      this.userName = data.name + " " + data.prenume;
    })
  }
  userRole! : string;
  userName!: string;
  house = faHouse;
  settings = faGears;
  searchTerm: string = '';
  laboratories = [
    { name: 'Laborator 1' },
    { name: 'Laborator 2' },
    { name: 'Laborator 3' },
    { name: 'Laborator 4' },
    { name: 'Laborator 5' },
    { name: 'Laborator 6' },
    { name: 'Laborator 7' },
    { name: 'Laborator 8' },
    { name: 'Laborator 9' },
    { name: 'Laborator 10' },
    { name: 'Laborator 11' },
    { name: 'Laborator 12' },
    // Add more laboratory objects as needed
  ];
  filteredLaboratories = [...this.laboratories];

  filterLaboratories() {
    this.filteredLaboratories = this.laboratories.filter(lab => 
      lab.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onClick() {
    this.http.logout().subscribe();
    this.router.navigate(['/login']);
  }

}
