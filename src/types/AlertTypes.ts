/**
 * type for alerts in application
 */

export enum MessageType {
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS = 'success',
    INFO = 'info'
  }

  
  export interface AlertMessage {
    type: MessageType;
    content: string;
    show_notification?: boolean;
  }