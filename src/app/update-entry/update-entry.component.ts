import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';

import { LedgerService } from '../services/ledger.service';

import { Ledger } from '../shared/ledger';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateEntryComponent implements OnInit {
  updateEntryForm: FormGroup;
  ledger: Ledger;
  entryType: string;
  entryId: number;

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient, private ledgerservice: LedgerService,
     public dialogRef: MatDialogRef<UpdateEntryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }
  createForm() {
   this.updateEntryForm = this.fb.group({
     amount: ['', Validators.required]
   });
 }
 ngOnInit() {
   if (this.data.debit > 0) {
     this.updateEntryForm.get('amount').setValue(this.data.debit / 100);
   }else{
     this.updateEntryForm.get('amount').setValue(this.data.credit / 100);
   }
   this.entryType = this.data.entryType.toLowerCase();
   this.entryId = this.data.id;

  }

   onSubmit() {
     const req = this.ledgerservice.deleteEntry(this.entryId, this.entryType);
     req.subscribe(data => {
           this.closeDialog();
     },
     (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           // A client-side or network error occurred. Handle it accordingly.
           console.log('An error occurred:', err.error.message);
         } else {
           // The backend returned an unsuccessful response code.
           // The response body may contain clues as to what went wrong,
           console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
         }
     });
   }

closeDialog() {
    this.dialogRef.close('updated');
  }
}
