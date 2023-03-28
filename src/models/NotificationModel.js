export default class NotificationModel {
  constructor(type, message) {
    this.id = (Math.random() + 1).toString(36).substring(2);
    this.type = type;
    this.message = message;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      message: this.message,
    };
  }
}
