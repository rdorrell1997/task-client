import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  showAlert(title: string, message: string): Observable<void> {
    return from(Dialog.alert({
        title,
        message
    }));
  }

  showPrompt(title: string, message: string): Observable<string> {
    return from(Dialog.prompt({
        title,
        message
    })).pipe(map(result => {
        return result.value;
    }));
  }
}
