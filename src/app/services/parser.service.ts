import { Injectable } from '@angular/core';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import {from, Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {AttributeTypeAndValueJson} from "pkijs";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  public parse(certData: File): Observable<pkijs.CertificateJson> {
    return from<Promise<ArrayBuffer>>(certData.arrayBuffer()).pipe(map((res: ArrayBuffer) => {
      const sequence = asn1js.fromBER(res).result;
      return new pkijs.Certificate({schema: sequence}).toJSON();

    }));
  }

  public findByOid(attributes: AttributeTypeAndValueJson[], key: string): string {
    return attributes.find(attribute => attribute.type === key)?.value.valueBlock.value;
  }

}
