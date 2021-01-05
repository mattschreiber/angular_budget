import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';

import { LedgerService } from '../services/ledger.service';
import { StoreandcatService } from '../services/storeandcat.service';
import { PaymenttypeService } from '../services/paymenttype.service';

import { Ledger } from '../shared/ledger';
import { Category } from '../shared/category';
import { Store } from '../shared/store';
import { PaymentType } from '../shared/paymenttype';

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
  storeAndCat: StoreAndCat = {category: [], store: []};
  // object used to load payment types drop down list
  paymentTypes: PaymentType 

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private ledgerservice: LedgerService, private storeandcatservice: StoreandcatService, private paymenttypeservice: PaymenttypeService,
     public dialogRef: MatDialogRef<UpdateEntryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }
  createForm() {
   this.updateEntryForm = this.fb.group({
     amount: ['', Validators.required],
     category: ['', Validators.required],
     paymenttype: ['', Validators.required]
    //  payment_type: ['amex', Validators.required]
   });
 }
 ngOnInit() {

  this.getStoreAndCat();
  this.getPaymentTypes();

   if (this.data.debit > 0) {
     this.updateEntryForm.get('amount').setValue(this.data.debit / 100);
   } else {
     this.updateEntryForm.get('amount').setValue(this.data.credit / 100);
   }
   this.entryType = this.data.entryType.toLowerCase();
   this.entryId = this.data.id;

  }

    // get all stores and categories to display on entry form.
  getStoreAndCat(): void {
    this.storeandcatservice.getStoreAndCat()
    .subscribe(data => {
        this.storeAndCat = data;
        this.updateEntryForm.get('category').setValue(this.data.category_id);
    },
    (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // get all stores and categories to display on entry form.
  getPaymentTypes(): void {
    this.paymenttypeservice.getPaymentTypes()
    .subscribe(data => {
        this.paymentTypes = data;
        this.updateEntryForm.get('paymenttype').setValue(this.data.payment_type_id);
    },
    (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
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
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
    });
   }

   onUpdate() {
    // convert debit and credit amounts to whole number for storing in the database
    if (this.data.debit > 0) {
      this.data.debit = +(this.updateEntryForm.get('amount').value * 100).toFixed(2);
    } else {
      this.data.credit = +(this.updateEntryForm.get('amount').value * 100).toFixed(2);
    }

    let model: Ledger = {id: this.data.id, debit: this.data.debit, credit: this.data.credit, trans_date: null, store: {id: null, store_name: null, default_credit: null, default_debit: null}, category: {id: this.updateEntryForm.get('category').value, category_name: ''}, payment_type: {id: this.updateEntryForm.get('paymenttype').value, payment_name: null}};

    const req = this.ledgerservice.updateEntry(model, this.entryType);

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
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
    });
   }

closeDialog() {
    this.dialogRef.close('updated');
  }
  
}

export interface StoreAndCat {
  category: Category[];
  store: Store[];
}
