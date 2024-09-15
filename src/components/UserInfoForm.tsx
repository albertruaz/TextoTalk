import { Component, createSignal } from "solid-js";

interface UserInfoFormProps {
  onSubmit: (info: string) => void;
}

const UserInfoForm: Component<UserInfoFormProps> = (props) => {
  const [info, setInfo] = createSignal<string>("");

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    props.onSubmit(info());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={info()}
          onInput={(e) => setInfo((e.target as HTMLInputElement).value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInfoForm;