import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);

    public openAiService = inject( OpenAiService )

    handleMessage( prompt: string ) {

      this.isLoading.set(true);
      this.messages.update( prev => [...prev, { isGpt: false, text: prompt }]);

      this.openAiService.checkImageGeneration(prompt)
        .subscribe( resp => {
          this.isLoading.set(false);
          if ( !resp ) return;

          this.messages.update( prev => [
            ...prev, {
              isGpt: true,
              text: resp.alt,
              imageInfo: resp
            }
          ]);
        })

    }
}
