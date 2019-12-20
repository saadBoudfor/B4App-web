/**
 *  Model for input component.
 *  fields cover: :
 *    - isRequired ? (default to false)
 *    - placeholder (required)
 *    - message to display / when display them.
 *    - isValid ?
 */
export interface InputModel {
  isRequired?: boolean;
  initValue?: string;
  placeholder?: string;
  isValid?: boolean;
  messages: Message[];
}


export interface Message {
  // type of message: info, warning, error ...
  type: MessageType;
  // condition to show the message (function).
  show: boolean;
  // content of message.
  content: string;
}

export enum MessageType {
  warn = 'warn', error = 'error', info = 'info'
}
