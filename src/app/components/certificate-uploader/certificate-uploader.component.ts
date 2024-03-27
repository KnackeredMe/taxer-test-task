import {Component, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxDropzoneChangeEvent, NgxDropzoneModule} from "ngx-dropzone";
import {ParserService} from "../../services/parser.service";
import {Subscription, catchError} from "rxjs";
import {ErrorHandlerService} from "../../services/error-handler.service";
import { StorageService } from '../../services/storage.service';

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
              private errorHandler: ErrorHandlerService,
              private storageService: StorageService) {
  }

  public upload(event: NgxDropzoneChangeEvent) {
    if (event.rejectedFiles.length > 0) {
      this.errorHandler.handleError(new Error('Wrong file format'));
      return;
    }

    this.parserService.parse(event.addedFiles[0]).subscribe({
      next: (res) => {
        this.storageService.save(res);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      }
    });
  }

  ngOnDestroy() {
    this.parseSubscription?.unsubscribe();
  }
}
