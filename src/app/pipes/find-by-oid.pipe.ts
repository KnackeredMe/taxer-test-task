import { Pipe, PipeTransform } from '@angular/core';
import {ParserService} from "../services/parser.service";
import {AttributeTypeAndValueJson} from "pkijs";

@Pipe({
  name: 'findByOid',
  standalone: true
})
export class FindByOidPipe implements PipeTransform {

  constructor(private parserService: ParserService) {
  }

  transform(attributes: AttributeTypeAndValueJson[] | undefined, oid: string): string | undefined{
    if (attributes) {
      return this.parserService.findByOid(attributes, oid);
    }
    return;
  }
}
