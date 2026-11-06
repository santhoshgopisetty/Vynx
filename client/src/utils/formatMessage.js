export function truncateMessage(text, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getMessagePreview(message) {
  if (!message) return 'No messages yet';
  return truncateMessage(message.text);
}
