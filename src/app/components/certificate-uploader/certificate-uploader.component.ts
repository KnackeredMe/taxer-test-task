import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxDropzoneChangeEvent, NgxDropzoneModule} from "ngx-dropzone";
import {ParserService} from "../../services/parser.service";

@Component({
  selector: 'app-certificate-uploader',
  standalone: true,
    imports: [
        NgIf,
        NgxDropzoneModule
    ],
  templateUrl: './certificate-uploader.component.html',
  styleUrl: './certificate-uploader.component.scss'
})
export class CertificateUploaderComponent {

  constructor(private parserService: ParserService) {

  }


  public upload(event: NgxDropzoneChangeEvent) {
    console.log(event);
    this.parserService.parse(event.addedFiles[0]);

  }
}
