import { Injectable } from '@angular/core';
import { audioToTextUseCase, createThreadUseCase, imageGenerationUseCase, imageVariationUseCase, orthographyUseCase, postQuestionUseCase, prosConsStreamUseCase, prosConsUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { from, Observable, of, pipe, tap } from 'rxjs';

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

  checkImageGeneration( prompt: string, originalName?: string, maskImage?: string ) {
    return from(imageGenerationUseCase(prompt, originalName, maskImage));
  }

  checkImageVariation(originalName: string ) {
    return from(imageVariationUseCase(originalName));
  }

  createThread(): Observable<string> {

    if ( localStorage.getItem('thread')) {
      return of(localStorage.getItem('thread')!);
    }
    return from(createThreadUseCase())
      .pipe(
        tap((thread) => {
          localStorage.setItem('thread', thread);
        })
      )
  }

  postQuestion( threadId: string, question: string) {
    return from( postQuestionUseCase( threadId, question ) )
  }

}
