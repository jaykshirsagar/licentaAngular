import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';
import { DataService } from '../../service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email = '';
  pass = '';
  users!: User[];
  constructor(private http: DataService, private router: Router){}
  
  ngOnInit() {
    this.http.getUsers().subscribe((data)=>{
      this.users = data;
      console.log(data);
    })
  }

  onClick(): void {
    alert(this.email + ' ' + this.pass);
    const matchingUser = this.users.find((user) => {
      if(user.email === this.email && user.password === this.pass)
      {
        this.http.loggedIn = true;
        return true;
      }
      return false;
    });
  
    if (matchingUser) {
      // Credentials match! You can proceed with further actions.
      this.router.navigate(['home']);
      this.http.setUserLogged(matchingUser).subscribe();
    } else {
      // Credentials do not match any user.
      alert('Incorect');
    }
  }
}
