import { Component, OnInit, Inject } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Ledger } from '../shared/ledger';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss']
})
export class UpdateEntryComponent implements OnInit {
  updateEntryForm: FormGroup;
  ledger: Ledger;

  constructor(private fb: FormBuilder, private router: Router,
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
    // console.log(this.updateEntryForm.get('amount').value);
  }
}
