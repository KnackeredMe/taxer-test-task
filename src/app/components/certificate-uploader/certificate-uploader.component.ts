import {Component, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxDropzoneChangeEvent, NgxDropzoneModule} from "ngx-dropzone";
import {ParserService} from "../../services/parser.service";
import {Subscription} from "rxjs";
import {ErrorHandlerService} from "../../services/error-handler.service";

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
export class CertificateUploaderComponent implements OnDestroy{

  private parseSubscription: Subscription | undefined
  constructor(private parserService: ParserService,
              private errorHandler: ErrorHandlerService) {
  }

  public upload(event: NgxDropzoneChangeEvent) {
    if (event.rejectedFiles.length > 0) {
      this.errorHandler.handleError(new Error('Wrong file format'));
      return;
    }
    this.parseSubscription = this.parserService.parse(event.addedFiles[0]);
  }

  ngOnDestroy() {
    this.parseSubscription?.unsubscribe();
  }
}
