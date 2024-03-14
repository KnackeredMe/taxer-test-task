import { Injectable } from '@angular/core';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import {from, Observable, Subscription} from "rxjs";
import {AttributeTypeAndValueJson} from "pkijs";
import {StorageService} from "./storage.service";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor(private storageService: StorageService,
              private errorHandler: ErrorHandlerService) { }

  public parse(certData: File): Subscription {
    const certDataBuffer: Observable<ArrayBuffer> = from<Promise<ArrayBuffer>>(certData.arrayBuffer());
    return certDataBuffer.subscribe({
      next: (res: ArrayBuffer) => {
        const sequence = asn1js.fromBER(res).result;
        try {
          const certificate = new pkijs.Certificate({schema: sequence}).toJSON();
          this.storageService.save(certificate);
        } catch (e) {
          this.errorHandler.handleError(e as Error)
        }
      }
    });
  }

  public findByOid(attributes: AttributeTypeAndValueJson[], key: string): string {
    return attributes.find(attribute => attribute.type === key)?.value.valueBlock.value;
  }

}
