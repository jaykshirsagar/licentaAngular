import { Component } from '@angular/core';
import { User } from '../../models/user';
import { DataService } from '../../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: DataService, private router: Router) { }

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  currentSlideIndex: number = 0;
  emailRegister: string = '';
  passRegister: string = '';
  functieRegister: string = '';
  numeRegister: string = '';
  prenumeRegister: string = '';
  userRegister: User = new User;
  onSubmit() {
    if (this.password === this.confirmPassword) {
      console.log('Înregistrare reușită!');
    } else {
      console.log('Parolele nu coincid.');
    }
  }

  prevSlide() {
    this.currentSlideIndex = this.currentSlideIndex - 1;
  }

  nextSlide() {
    // Assuming there are only 2 slides, change the condition as per your requirement
    this.currentSlideIndex = this.currentSlideIndex + 1;
  }
  

  confirmRegister() {
    this.userRegister.email = this.emailRegister;
    //this.userRegister.password = shajs('sha256').update(this.passRegister).digest('hex');
    this.userRegister.password = this.passRegister;
    console.log(this.userRegister.password);
    this.userRegister.functie = this.functieRegister;
    this.userRegister.name = this.numeRegister;
    this.userRegister.prenume = this.prenumeRegister;
    this.http.postUser(this.userRegister).subscribe();
    this.router.navigate(['/home']);
  }

}







