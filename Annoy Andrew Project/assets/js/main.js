let stopThread = false;

function sendDiscordMessage() {
    const webhookUrl = 'https://discord.com/api/webhooks/1214129713585328199/u3FjZRxux9F_K9KawiMsZgtp2RoskMHIzpU-HC0BrNIbs0VQFkDkzSNnmHerQvaTUad7';
    const messageContent = '<@756818500688937022> Hello';

    const headers = {
        'Content-Type': 'application/json'
    };

    const mentions = [{
        'id': 756818500688937022,
        'type': 6
    }];

    const payload = {
        'content': messageContent,
        'mentions': mentions
    };

    function sendMessage() {
        if (!stopThread) {
            fetch(webhookUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.status === 204) {
                    console.log("Message sent successfully");
                } else {
                    console.error(`Failed to send message. Status code: ${response.status}`);
                    return response.text();
                }
            })
            .then(errorMessage => {
                if (errorMessage) {
                    console.error(errorMessage);
                }
                setTimeout(sendMessage, 100);
            })
            .catch(error => {
                console.error("Error:", error);
                setTimeout(sendMessage, 100);
            });
        }
    }

    sendMessage();
}

document.querySelector('.button-1').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior of anchor element
    stopThread = false;
    sendDiscordMessage();
});

document.querySelector('.button-2').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior of anchor element
    stopThread = true;
});
