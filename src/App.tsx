// import { createSignal } from "solid-js";
// import FileUpload from "./components/FileUpload";
// import ParsedDataDisplay from "./components/ParsedDataDisplay";
// import UserInfoForm from "./components/UserInfoForm";
// import { parseData, ParsedData } from "./utils/parseData";

// function App() {
//   const [parsedData, setParsedData] = createSignal<ParsedData[]>([]);
//   const [userInfo, setUserInfo] = createSignal<string>("");

//   const handleFileParsed = (data: string) => {
//     const parsed = parseData(data);
//     setParsedData(parsed);
//   };

//   const handleUserInfoSubmit = (info: string) => {
//     setUserInfo(info);
//   };

//   return (
//     <div>
//       <h1>File Upload Example</h1>
//       <h1 class="text-3xl font-bold text-blue-500">
//         Hello world!
//       </h1>
//       <FileUpload onFileParsed={handleFileParsed} />
//       <UserInfoForm onSubmit={handleUserInfoSubmit} />
//       <ParsedDataDisplay data={parsedData()} info={userInfo()} />
//     </div>
//   );
// }

// export default App;

// src/App.tsx
import { createSignal } from 'solid-js';
import { FileUploader } from './components/FileUploader';
import { ChatWindow } from './components/ChatWindow';
import { Message } from './types';

function App() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const currentUser = '심수용'; // 본인의 이름으로 설정해주세요.

  return (
    <div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <FileUploader onMessagesParsed={setMessages} />
      <ChatWindow messages={messages()} currentUser={currentUser} />
    </div>
  );
}

export default App;
