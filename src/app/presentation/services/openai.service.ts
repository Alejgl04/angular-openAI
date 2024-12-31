import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/index';
import { from, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography( prompt: string ) {
    return from (orthographyUseCase(prompt));
  }
}
