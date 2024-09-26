export interface Message {
  date: Date;
  sender: string;
  content: string;
  type: 'text' | 'photo' | 'system';
}
