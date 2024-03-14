import { Injectable } from '@angular/core';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import {from, Observable} from "rxjs";
import {AttributeTypeAndValue, GeneralNames} from "pkijs";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private X509_COMMON_NAME_KEY: string = '2.5.4.3';
  private X509_ISSUER_NAME_KEY: string = '2.5.4.10';

  constructor() { }

  public parse(certData: File) {
    const observable: Observable<ArrayBuffer> = from<Promise<ArrayBuffer>>(certData.arrayBuffer());
    observable.subscribe({
      next: (res: ArrayBuffer) => {
        const sequence = asn1js.fromBER(res).result;

        const certificate = new pkijs.Certificate({schema: sequence});

        const subjectAttributes = certificate.subject.typesAndValues;
        const commonName = this.findByKey(subjectAttributes, this.X509_COMMON_NAME_KEY);
        console.log(commonName);

        const issuerAttributes = certificate.issuer.typesAndValues;
        const issuerName = this.findByKey(issuerAttributes, this.X509_ISSUER_NAME_KEY);
        console.log(issuerName);

        const validFrom = certificate.notBefore.value.toString();
        console.log(validFrom);

        const validTo = certificate.notAfter.value.toString();
        console.log(validTo);
      }
    })

  }

  private findByKey(attributes: AttributeTypeAndValue[], key: string): string | undefined {
    return attributes.find(attribute => attribute.type === key)?.value.valueBlock.value;
  }

}
