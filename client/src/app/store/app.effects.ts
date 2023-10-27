import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class MyEffects {
  constructor(private actions$: Actions) {}
}