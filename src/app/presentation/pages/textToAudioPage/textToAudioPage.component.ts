import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TextMessageBoxEvent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxSelectComponent,
    TypingLoaderComponent
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);
  public openAiService = inject( OpenAiService )

  handleMessageWithSelect( {prompt, selectOption}: TextMessageBoxEvent ) {

    const messsage = `${selectOption} - ${prompt}`;

    this.messages.update( prev => [...prev, { isGpt: false, text: messsage}]);
    this.isLoading.set(true);

    this.openAiService.checkTextToAudio( prompt, selectOption )
      .subscribe( ({message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update( prev => [
          ...prev,
          { isGpt: true, text: message, audioUrl: audioUrl}
        ]);

      })

  }
}
