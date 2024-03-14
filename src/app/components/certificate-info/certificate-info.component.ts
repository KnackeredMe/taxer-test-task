import {Component, Input, OnChanges} from '@angular/core';
import {CertificateJson} from "pkijs";
import {FindByOidPipe} from "../../pipes/find-by-oid.pipe";
import {ATTRIBUTES_OID} from "../../constants/attributes-oid";
import {DatePipe, NgIf} from "@angular/common";
import {ParserService} from "../../services/parser.service";
import {TruncatePipe} from "../../pipes/truncate.pipe";

@Component({
  selector: 'app-certificate-info',
  standalone: true,
  imports: [
    FindByOidPipe,
    NgIf,
    DatePipe,
    TruncatePipe
  ],
  templateUrl: './certificate-info.component.html',
  styleUrl: './certificate-info.component.scss'
})
export class CertificateInfoComponent implements OnChanges{

  public commonName: string = '';
  public issuerName: string = '';
  public validFrom: Date | undefined;
  public validTo: Date | undefined;
  @Input() certificate: CertificateJson | undefined;

  constructor(private parserService: ParserService) {
  }

  ngOnChanges() {
    if(this.certificate?.subject.typesAndValues) {
      this.commonName = this.parserService.findByOid(this.certificate.subject.typesAndValues, ATTRIBUTES_OID.COMMON_NAME);
    }
    if(this.certificate?.issuer.typesAndValues) {
      this.issuerName = this.parserService.findByOid(this.certificate.issuer.typesAndValues, ATTRIBUTES_OID.ISSUER_NAME);
    }
    this.validFrom = this.certificate?.notBefore.value;
    this.validTo = this.certificate?.notAfter.value;
  }
}
