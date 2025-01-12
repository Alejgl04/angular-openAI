import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public threadId = signal<string|undefined>(undefined);

  public openAiService = inject( OpenAiService )

  ngOnInit(): void {
    this.openAiService.createThread()
      .subscribe( id => {
        this.threadId.set(id);
      })
  }


  handleMessage( question: string ) {
    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { isGpt: false, text: question } ]);

    this.openAiService.postQuestion( this.threadId()!, question )
      .subscribe( replies => {
        this.isLoading.set(false);
        const reply = replies[replies.length - 1];

        for (const message of reply.content) {
            this.messages.update( prev => [
              ...prev,
              {
                text: message,
                isGpt: reply.role === 'assistant'
              }
            ]);
          }
      })
  }
}
