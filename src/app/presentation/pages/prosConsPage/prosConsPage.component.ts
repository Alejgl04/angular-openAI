import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject( OpenAiService )

  handleMessage( prompt: string ) {

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);
    this.isLoading.set(true);
    this.openAiService.checkProsCons(prompt)
      .subscribe( resp => {
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.content
          }
        ])

      })
  }
}
