import { createSignal } from "solid-js";
import FileUpload from "./components/FileUpload";
import ParsedDataDisplay from "./components/ParsedDataDisplay";
import UserInfoForm from "./components/UserInfoForm";
import { parseData, ParsedData } from "./utils/parseData";

function App() {
  const [parsedData, setParsedData] = createSignal<ParsedData[]>([]);
  const [userInfo, setUserInfo] = createSignal<string>("");

  const handleFileParsed = (data: string) => {
    const parsed = parseData(data);
    setParsedData(parsed);
  };

  const handleUserInfoSubmit = (info: string) => {
    setUserInfo(info);
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <h1 class="text-3xl font-bold text-blue-500">
        Hello world!
      </h1>
      <FileUpload onFileParsed={handleFileParsed} />
      <UserInfoForm onSubmit={handleUserInfoSubmit} />
      <ParsedDataDisplay data={parsedData()} info={userInfo()} />
    </div>
  );
}

export default App;