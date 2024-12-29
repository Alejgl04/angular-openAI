import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [],
  templateUrl: './chatMessages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {

  text = input.required<string>();

}
