function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  // Simulate Gemini AI response
  setTimeout(() => {
    const botReply = "Gemini is thinking... (this is dummy response)";
    appendMessage("bot", botReply);
  }, 1000);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
