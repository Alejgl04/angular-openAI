import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageEvent, TypingLoaderComponent } from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject( OpenAiService )

  handleMessageWihFile( { prompt, file }: TextMessageEvent ) {

    const text = prompt ?? file.name ?? 'Translate the audio'

    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { isGpt: false, text: text}]);

    this.openAiService.checkAudioToText(file, text)
      .subscribe( resp => this.handleAudioToText(resp) );
  }

  handleAudioToText( response: AudioToTextResponse | null ) {
    this.isLoading.set(false);
    if ( !response ) return;

    const text = `## Transcription:

    __Duration:__ ${Math.round( response.duration )} seconds.

    ## Text is:
    ${response.text}
    `;

    this.messages.update( prev => [...prev, { isGpt: true, text: text}]);

    for( const segment of response.segments ) {
      const SegmentMessage = `
__From ${ Math.round( segment.start )} to ${ Math.round( segment.end ) } seconds.__
      ${segment.text}
      `;

      this.messages.update( prev => [...prev, { isGpt: true, text: SegmentMessage}]);

    }
  }
}
