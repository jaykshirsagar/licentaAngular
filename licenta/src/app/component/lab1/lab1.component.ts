import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrl: './lab1.component.css'
})
export class Lab1Component {
  pdfUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer){
    let url = 'assets/lab1.pdf';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}
