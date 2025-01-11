import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, GtpMessageEditableImageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    GtpMessageEditableImageComponent
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public originalImage = signal<string|undefined>(undefined);
  public maskImage = signal<string|undefined>(undefined);

  public openAiService = inject(OpenAiService)

  handleMessage(prompt: string) {

    this.isLoading.set(true);
    this.messages.update(prev => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.checkImageGeneration(prompt, this.originalImage(), this.maskImage())
      .subscribe(resp => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update(prev => [
          ...prev, {
            isGpt: true,
            text: resp.alt,
            imageInfo: resp
          }
        ]);
      })
  }
  generateVariation(): void {

    if ( !this.originalImage() ) return;
    this.isLoading.set(true);

    this.openAiService.checkImageVariation(this.originalImage()!)
      .subscribe(resp => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update(prev => [
          ...prev, {
            isGpt: true,
            text: resp.alt,
            imageInfo: resp
          }
        ]);
      })
  }

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);


  }
}
