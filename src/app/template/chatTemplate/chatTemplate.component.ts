import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMessageEvent, TextMessageBoxEvent, ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject( OpenAiService )

  handleMessage( prompt: string ) {
    console.log(prompt);
  }

  // handleMessageWihFile( { prompt, file }: TextMessageEvent ) {
  //   console.log({ prompt, file });
  // }

  // handleMessageWithSelect( event: TextMessageBoxEvent ) {
  //   console.log(event);
  // }
}
