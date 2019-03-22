import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StoreandcatService } from '../services/storeandcat.service';
import { Store } from '../shared/store';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {

  addStoreForm: FormGroup;
  flashMessage: string; // Add message indicating if new entry successful
  showFlashMessage = false;

  constructor(private storeandcatservice: StoreandcatService, private fb: FormBuilder,
    private http: HttpClient,) {
      this.createForm();
    }

  createForm() {
   this.addStoreForm = this.fb.group({
     store_name: ['', Validators.required]
   });
 }

  ngOnInit() {
  }

  onSubmit() {
    let store: Store;
    store = this.addStoreForm.value;
    store.store_name = store.store_name.toLowerCase();
    this.storeandcatservice.createStore(store)
    .subscribe(data => {
          this.addStoreForm.reset();
          this.showFlashMessage = true;
          this.flashMessage = "Successfully added store: " + store.store_name;
          console.log(data.id);
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

}
