import { createSignal } from "solid-js";

interface FileUploadProps {
  onFileParsed: (data: string) => void;
}

function FileUpload(props: FileUploadProps) {
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string;
        props.onFileParsed(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt,.csv" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;