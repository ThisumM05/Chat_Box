let selectedUser = "";
const msgArr = [];

function selectUser(sender) {
    selectedUser = sender;
    console.log("Selected Sender: " + sender);
    sendMessage(sender);
}



function sendMessage(){
    if (selectedUser===""){
        alert("Please select a user ");
        return;
    }

    let userMeassage = document.getElementById("messageInput").value;
    if (userMeassage===""){
        alert("Enter message");
        return;
    }
    let newMessage = {
        sender: selectedUser,
        message: userMeassage
    };

    msgArr.push(newMessage);
    console.log(msgArr);


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": userMeassage 
            }
          ]
        }
      ]
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };
    
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBlL5ZEPy1a8owoDqummomlCnlqQbTNxrU", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const message = result.candidates[0].content.parts[0].text;
      const messageElement = document.createElement('div');
      messageElement.className = "sender-right";
      messageElement.textContent = message;
    
      const chatOb = {
        message:message,
        sender: 'sender-left'
    }
    msgArr.push(chatOb)
    
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
    messageInput.focus();
    console.log(result.candidates[0].content.parts[0].text)
  })



    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${newMessage.message}`;
    messageElement.style.margin = "5px 0";
    chatbox.appendChild(messageElement);

    if (newMessage.sender === "Sender 1") {
        messageElement.classList.add("sender-right");
    } else {
        messageElement.classList.add("sender-left");
    }

    chatbox.appendChild(messageElement);
      

}
