import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {CertificateUploaderComponent} from "../../components/certificate-uploader/certificate-uploader.component";
import {CertificateInfoComponent} from "../../components/certificate-info/certificate-info.component";

@Component({
  selector: 'app-certificates-page',
  standalone: true,
  imports: [
    NgIf,
    NgxDropzoneModule,
    CertificateUploaderComponent,
    CertificateInfoComponent,
  ],
  templateUrl: './certificates-page.component.html',
  styleUrl: './certificates-page.component.scss'
})
export class CertificatesPageComponent {
  public addCertificate: boolean = false;

}
