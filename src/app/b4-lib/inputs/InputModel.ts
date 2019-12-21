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
  label?: string;
  isValid?: boolean;
  type?: InputType;
  messages?: Message[];
  icon?: string;
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

export enum InputType {
  date = 'date', text = 'text', number = 'number', textarea = 'textarea'
}
