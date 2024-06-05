import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { DataService } from '../../service.service';
import { Router } from '@angular/router';
import { randomFill } from 'crypto';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js`;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {
  constructor(private http: DataService, private router: Router) { }
  public files: NgxFileDropEntry[] = [];
  public tableData: any[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileReader = new FileReader();
          fileReader.onload = (e: ProgressEvent<FileReader>) => {
            const arrayBuffer = e.target!.result as ArrayBuffer;
            this.extractTableFromPdf(arrayBuffer)
              .then((table) => {
                this.tableData = table;
              })
              .catch((error) => {
                console.error('Error extracting table:', error);
              });
          };
          fileReader.readAsArrayBuffer(file);
        });
      }
    }
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target!.result as ArrayBuffer;
        this.extractTableFromPdf(arrayBuffer)
          .then((table) => {
            this.tableData = table;
          })
          .catch((error) => {
            console.error('Error extracting table:', error);
          });
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  private extractTableFromPdf(arrayBuffer: ArrayBuffer): Promise<any[]> {
    const uint8Array = new Uint8Array(arrayBuffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });

    return loadingTask.promise
      .then((pdf: any) => {
        const textPromises = [];
        for (let i = 0; i < pdf.numPages; i++) {
          textPromises.push(pdf.getPage(i + 1).then((page: any) => page.getTextContent()));
        }
        return Promise.all(textPromises);
      })
      .then((texts: any[]) => {
        const textContent = texts.map((text: any) => text.items.map((item: any) => item.str).join(' ')).join(' ');
        return this.parseTableFromText(textContent);
      });
  }

  private parseTableFromText(textContent: string): any[] {
    const rows = [];
    // Această expresie regulată este ajustată pentru a include caractere speciale și spații suplimentare în nume
    const regex = /(\d+)\s+([\p{L}\s.'-]+)\s+(\S+@\S+\.\S+)/gu;
    let match;
    while ((match = regex.exec(textContent)) !== null) {
      // Eliminăm spațiile albe excesive din nume
      const name = match[2].replace(/\s+/g, ' ').trim();
      rows.push({
        NrCrt: match[1],
        NumeSiPrenume: name,
        Email: match[3]
      });
    }
    return rows;
  }
  async saveData() {
    for (const element of this.tableData) {
        const nameParts = this.splitName(element.NumeSiPrenume);
        await this.http.postUser({
            name: nameParts.nume,
            prenume: nameParts.prenume,
            email: element.Email,
            functie: 'Student',
            password: nameParts.nume + nameParts.prenume
        }).toPromise();
    }
}

   splitName(fullName: string): { nume: string; prenume: string } {
    // Separăm numele complet într-un array de cuvinte
    const parts = fullName.split(' ');
    
    // Presupunem că primul cuvânt este numele de familie
    const nume = parts[0];
    
    // Restul cuvintelor sunt considerate prenume
    const prenume = parts.slice(1).join(' ');
    
    return { nume, prenume };
  }
  
}
