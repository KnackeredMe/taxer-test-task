import { Injectable } from '@angular/core';
import {CertificateJson} from "pkijs";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public certificates: CertificateJson[] = [];
  private savedSubject: Subject<void> = new Subject<void>();
  public saved$: Observable<void> = this.savedSubject.asObservable();

  constructor() { }

  public save(certificate: CertificateJson) {
    this.certificates.push(certificate)
    localStorage.setItem('certificates', JSON.stringify(this.certificates));
    this.savedSubject.next();
  }

  public getFromLocalStorage() {
    const certificatesStr = localStorage.getItem('certificates');
    if (certificatesStr) {
      this.certificates = JSON.parse(certificatesStr) as CertificateJson[];
    }
  }
}
