import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private http: DataService, private router: Router) {}
  ngOnInit(): void {
    this.http.getUserLogged().subscribe((data)=>{
      if(data == null) this.router.navigate(['/login']);
    })
  }

}
