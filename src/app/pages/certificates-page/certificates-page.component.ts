import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {CertificateUploaderComponent} from "../../components/certificate-uploader/certificate-uploader.component";
import {CertificateInfoComponent} from "../../components/certificate-info/certificate-info.component";
import {StorageService} from "../../services/storage.service";
import {FindByOidPipe} from "../../pipes/find-by-oid.pipe";
import {ATTRIBUTES_OID, IAttributesOid} from "../../constants/attributes-oid";
import {MatIcon} from "@angular/material/icon";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-certificates-page',
  standalone: true,
  imports: [
    NgIf,
    NgxDropzoneModule,
    CertificateUploaderComponent,
    CertificateInfoComponent,
    NgForOf,
    FindByOidPipe,
    MatIcon,
  ],
  templateUrl: './certificates-page.component.html',
  styleUrl: './certificates-page.component.scss'
})
export class CertificatesPageComponent implements OnInit, OnDestroy{

  protected readonly ATTRIBUTES_OID: IAttributesOid = ATTRIBUTES_OID;
  public addCertificate: boolean = false;
  public selected: number | null = null;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(public storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.getFromLocalStorage();
    this.storageService.savedSubject
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.selected = this.storageService.certificates.length - 1;
            this.addCertificate = false;
          }
        })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
