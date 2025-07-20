const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Simulasi dummy balasan bot (placeholder)
  setTimeout(() => {
    appendMessage('bot', 'Mohon ditunggu...');
  }, 1000);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:3000/api/chat", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify({ prompt: userMessage }));
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      appendMessage('bot', response.response);
    }
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.innerHTML = marked.parse(text);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
