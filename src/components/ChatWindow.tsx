import { For, createEffect, onMount, JSX } from 'solid-js';
import { Message } from '../type';
import { MessageBubble } from './MessageBubble';

interface Props {
  messages: Message[];
  currentUser: string;
  searchResults: number[];
  currentResultIndex: number;
  searchTerm: string;
  ref: (el: HTMLDivElement) => void;
}

export function ChatWindow(props: Props): JSX.Element {
  let messageListRef: HTMLDivElement;

  onMount(() => {
    if (messageListRef) {
      messageListRef.scrollTop = messageListRef.scrollHeight;
    }
  });

  createEffect(() => {
    const index = props.searchResults[props.currentResultIndex];
    if (index !== undefined && messageListRef) {
      const messageElement = messageListRef.children[index] as HTMLDivElement;
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  return (
    <div
      ref={(el) => {
        messageListRef = el;
        props.ref(el);
      }}
      class="flex-grow flex flex-col p-4 space-y-2 overflow-auto"
    >
      <For each={props.messages}>
        {(message, index) => {
          const isSearchResult = props.searchResults.includes(index());
          const isCurrentResult =
            isSearchResult &&
            index() === props.searchResults[props.currentResultIndex];
          return (
            <div
              class={`${isSearchResult ? 'bg-yellow-100' : ''} ${
                isCurrentResult ? 'border border-blue-500' : ''
              }`}
            >
              <MessageBubble
                message={message}
                isDate={message.type === 'date'}
                isMine={message.sender === props.currentUser}
                searchTerm={props.searchTerm}
              />
            </div>
          );
        }}
      </For>
    </div>
  );
}
