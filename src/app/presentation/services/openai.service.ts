import { Injectable } from '@angular/core';
import { audioToTextUseCase, orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography( prompt: string ) {
    return from (orthographyUseCase(prompt));
  }
  checkProsCons( prompt: string ) {
    return from (prosConsUseCase(prompt))
  }

  checkProsConsStream( prompt: string, abortSignal: AbortSignal ): AsyncIterableIterator<string> {
    return prosConsStreamUseCase(prompt,abortSignal);
  }

  checkTranslate( prompt: string, lang: string ) {
    return from(translateUseCase(prompt,lang));
  }

  checkTextToAudio( prompt: string, voice: string ) {
    return from(textToAudioUseCase(prompt,voice));
  }

  checkAudioToText( file: File, prompt?: string ) {
    return from(audioToTextUseCase(file,prompt));
  }
}
