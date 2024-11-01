import { createSignal, createMemo, createEffect } from 'solid-js';
import { ChatWindow } from './components/ChatWindow';
import { SearchBar } from './components/SearchBar';
import { Calendar } from './components/Calendar';
import { Sidebar } from './components/Sidebar';
import { FileUploader } from './components/FileUploader';
import { Message } from './type';
import { format, parse, isValid } from 'date-fns';
import { Switch, Match } from 'solid-js';

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

const themes: { [key: string]: string } = {
  kakao: 'kakao',
  imessage: 'imessage',
  telegram: 'telegram',
};

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function App() {
  const [chats, setChats] = createSignal<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = createSignal<string>('');
  const [searchTerm, setSearchTerm] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<number[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = createSignal(0);
  const [showFileUploader, setShowFileUploader] = createSignal(false);
  const [showCalendar, setShowCalendar] = createSignal(false); // 달력 가시성 상태 추가
  const [currentMonth, setCurrentMonth] = createSignal(new Date()); // 달력의 현재 월 추가
  const [theme, setTheme] = createSignal(
    localStorage.getItem('theme') || 'kakao'
  ); // 기본 테마는 kakao

  const toggleTheme = (newTheme: string) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  const addChat = (name: string, messages: Message[]) => {
    const newChat: Chat = {
      id: generateUniqueId(),
      name,
      messages,
    };
    setChats([...chats(), newChat]);
    setCurrentChatId(newChat.id);
  };

  const currentChat = createMemo(() =>
    chats().find((chat) => chat.id === currentChatId())
  );

  createEffect(() => {
    document.documentElement.className = themes[theme()];
    localStorage.setItem('theme', theme());

    const term = searchTerm().toLowerCase();
    if (term && currentChat()) {
      const indices = currentChat()!
        .messages.map((msg, index) =>
          msg.content.toLowerCase().includes(term) ? index : -1
        )
        .filter((index) => index !== -1);
      setSearchResults(indices);
      // 검색 결과의 초기 위치를 마지막으로 설정
      setCurrentResultIndex(indices.length > 0 ? indices.length - 1 : 0);
    } else {
      setSearchResults([]);
    }
  });

  const handlePrevResult = () => {
    setCurrentResultIndex((prev) =>
      prev > 0 ? prev - 1 : searchResults().length - 1
    );
  };

  const handleNextResult = () => {
    setCurrentResultIndex((prev) => (prev + 1) % searchResults().length);
  };

  const handleDateSelect = (date: Date) => {
    setShowCalendar(false); // 날짜 선택 후 달력을 숨깁니다.

    if (currentChat()) {
      const index = currentChat()!.messages.findIndex(
        (msg) =>
          msg.type === 'date' &&
          format(msg.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      if (index !== -1) {
        scrollToMessage(index);
      }
    }
  };

  let messageListRef: HTMLDivElement | undefined;

  const scrollToMessage = (index: number) => {
    if (messageListRef) {
      const messageElement = messageListRef.children[index] as HTMLDivElement;
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  const availableDates = createMemo(() => {
    if (!currentChat()) return [];

    return currentChat()!
      .messages.filter((msg) => msg.type === 'date' && isValid(msg.date))
      .map((msg) => msg.date);
  });

  const currentUser = '강승완'; // 본인의 이름으로 설정하세요.

  return (
    <div class="flex h-screen">
      <Sidebar
        chats={chats()}
        currentChatId={currentChatId()}
        onSelectChat={setCurrentChatId}
        onAddChat={() => {
          setShowFileUploader(true);
        }}
        toggleTheme={toggleTheme} // 테마 전환 함수 전달
      />
      <div class="flex-grow flex flex-col">
        <Switch>
          <Match when={showFileUploader()}>
            <FileUploader
              onFileUploaded={(name, messages) => {
                addChat(name, messages);
                setShowFileUploader(false);
              }}
            />
          </Match>
          <Match when={currentChat()}>
            <div class="flex items-center">
              <SearchBar
                searchTerm={searchTerm()}
                setSearchTerm={setSearchTerm}
                searchResultsCount={searchResults().length}
                currentResultIndex={currentResultIndex()}
                onPrevResult={handlePrevResult}
                onNextResult={handleNextResult}
              />
              {/* 달력 아이콘 추가 */}
              <button
                class="p-2"
                onClick={() => setShowCalendar(!showCalendar())}
              >
                {/* Heroicons의 달력 아이콘 사용 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <div class="flex justify-end">
                <button
                  onClick={() => toggleTheme('kakao')}
                  class="mr-2 bg-[#f9e000] text-black px-2 py-1 rounded"
                >
                  Kakao
                </button>
                <button
                  onClick={() => toggleTheme('imessage')}
                  class="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  iMessage
                </button>
                <button
                  onClick={() => toggleTheme('telegram')}
                  class="bg-gray-600 text-white px-2 py-1 rounded"
                >
                  Telegram
                </button>
              </div>
            </div>
            {/* 달력 표시 */}
            {showCalendar() && (
              <div class="absolute z-10 bg-white shadow-md rounded">
                <Calendar
                  availableDates={availableDates()}
                  onSelectDate={handleDateSelect}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                />
              </div>
            )}
            <ChatWindow
              ref={(el) => (messageListRef = el)}
              messages={currentChat()!.messages}
              currentUser={currentUser}
              searchResults={searchResults()}
              currentResultIndex={currentResultIndex()}
              searchTerm={searchTerm()}
              theme={theme()}
            />
          </Match>
          <Match when={!currentChat() && !showFileUploader()}>
            <div class="p-4">채팅을 선택하거나 추가하세요.</div>
          </Match>
        </Switch>
      </div>
    </div>
  );
}

export default App;
