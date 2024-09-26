import { For, JSX } from 'solid-js';

interface Chat {
  id: string;
  name: string;
}

interface Props {
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (id: string) => void;
  onAddChat: () => void;
}

export function Sidebar(props: Props): JSX.Element {
  return (
    <div class="w-64 bg-gray-800 text-white flex flex-col">
      <button class="p-2 bg-gray-700" onClick={props.onAddChat}>
        + 추가
      </button>
      <For each={props.chats}>
        {(chat) => (
          <div
            class={`p-2 cursor-pointer ${
              chat.id === props.currentChatId ? 'bg-gray-700' : ''
            }`}
            onClick={() => props.onSelectChat(chat.id)}
          >
            {chat.name}
          </div>
        )}
      </For>
    </div>
  );
}
