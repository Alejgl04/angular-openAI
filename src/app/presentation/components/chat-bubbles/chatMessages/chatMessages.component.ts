import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './chatMessages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {

  text = input.required<string>();
  @Input() audioUrl?: string;


}
