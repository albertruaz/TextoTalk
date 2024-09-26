// src/components/ChatWindow.tsx
import { For } from 'solid-js';
import { Message } from '../type';
import { MessageBubble } from './MessageBubble';

interface Props {
  messages: Message[];
  currentUser: string;
}

export function ChatWindow(props: Props) {
  return (
    <div class="flex flex-col p-4 space-y-2">
      <For each={props.messages}>
        {(message) => (
          <MessageBubble
            message={message}
            isMine={message.sender === props.currentUser}
          />
        )}
      </For>
    </div>
  );
}
