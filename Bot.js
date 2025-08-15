let lastBotMessage = "";      // Stores last visible bot message
let conversationState = "";   // Stores special state flags like "help_prompt"

function appendReply(message) {
    const answer = document.getElementById("answer");

    const p = document.createElement("p");
    p.textContent = message;

    Object.assign(p.style, {
        marginBottom: "10px",
        color: "rgb(200, 200, 200)",
        fontSize: "18px",
        backgroundColor: "rgb(70, 70, 70)",
        padding: "10px 15px",
        borderRadius: "15px",
        maxWidth: "60%",
        lineHeight: "1.4"
    });

    answer.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);

    lastBotMessage = message;
    conversationState = ""; // Reset unless explicitly set
}

function appendReplyItalic(message) {
    const answer = document.getElementById("answer");

    const pItalic = document.createElement("p");
    pItalic.textContent = message;

    Object.assign(pItalic.style, {
        marginBottom: "10px",
        color: "rgb(200, 200, 200)",
        fontSize: "18px",
        fontStyle: "italic",
        backgroundColor: "rgb(70, 70, 70)",
        padding: "10px 15px",
        borderRadius: "15px",
        maxWidth: "60%",
        lineHeight: "1.4"
    });

    answer.appendChild(pItalic);
    window.scrollTo(0, document.body.scrollHeight);

    lastBotMessage = message;
    conversationState = ""; // Reset unless explicitly set
}


function getAnswer() {
    const inputElement = document.getElementById("userInput");
    const input = inputElement.value.toLowerCase().trim();
    inputElement.value = "";

    // Check for follow-up phrasing
    const isFollowUp = ["why", "how", "tell me more", "explain more", "what do you mean", "what's that", "what is that", "what's that?", "what is that?", "really", "really?"].some(phrase => input.includes(phrase));
    if (isFollowUp && lastBotMessage) {
        handleFollowUp();
        return;
    }

    // --- MAIN BOT RESPONSES ---
    if (
        input.includes("hi") ||
        input.includes("hello") ||
        input.includes("sup")
    ) {
        appendReply("Hello! What can I help with D-OS?");
    }

    else if (input.includes("who are you") || input.includes("what are you")) {
        appendReply("I am a chatbot to support you about D-OS.");
        appendReply("Ask me anything about functions, features, or how it works!");
    }

    else if (input.includes("who created d-os")) {
        appendReply("D-OS is an HTML Operating System, powered by JavaScript and HTML.");
        appendReply("It adapts to your browser, using WebGL or simpler rendering if needed.");
    }

    else if (input.includes("does amados have other oses")) {
        appendReply("Yep! They do have other OSes, they have 2 kinds of OSes other than D-OS, 1 is G-OS, 2 is Windows WTV");
    }

    else if (input.includes("what is amados")) {
        appendReply("AmadOS is a small system, controlled by one person, the person's name was M4, the actual name cannot be shown, AmadOS actually makes OSes, like D-OS, Windows WTV, and G-OS.");
    }

    else if (input.includes("what is d-os") || input.includes("what's d-os")) {
        appendReply("D-OS is a HTML OS, made by the AmadOS owner, M4.");
    }

    else if (input.includes("who made you") || input.includes("who made u")) {
        appendReply("I was made by AmadOS, to help users of D-OS like you to know more about D-OS. I might also not be able to answer questions that are unsupported or not included in my Javascript coding.");
    }

    else if (input === "oh") {
        appendReplyItalic("(D-OS cannot understand your question, please try to rephrase it or ask something else.)");
    }

    else if (input.includes("i need help with d-os") || input.includes("i need help")) {
        appendReply("Sure! What do you need help with regarding D-OS?");
        conversationState = "help_prompt"; // <-- Set help state here
    }

    else {
        appendReplyItalic("(D-OS cannot understand your question, please try to ask something else or ask something related to D-OS, it may be it's not in its 'question list'.)");
    }
}

// 📌 Handle follow-up questions
function handleFollowUp() {
    const inputElement = document.getElementById("userInput");
    const input = inputElement.value.toLowerCase().trim();
    inputElement.value = "";

    // Lowercase lastBotMessage for robust matching
    const last = lastBotMessage.toLowerCase();

    if (last.includes("i am a chatbot")) {
        appendReply("I was built using JavaScript to support users on AmadOS' D-OS platform.");
    }
    else if (last.includes("d-os has 3 different series")) {
        appendReply("D-OS 3 is the most modern version, featuring a startup sound and start menu.");
    }
    else if (last.includes("they do have other oses")) {
        appendReply("G-OS is the first ever OS, made by AmadOS, it was designed with shades of green, because G-OS was short for 'GreenOS'. Windows WTV has a Windows 95-like interface, with draggable windows, a start button, and more.");
    }
    else if (
        last.includes("hello! what can i help with d-os?") &&
        input.includes("what is d-os")
    ) {
        appendReply("D-OS is an operating system, made by AmadOS, in 2025");
    }
    else if (
        last.includes("the person's name was m4") &&
        input.includes("what's his real name")
    ) {
        appendReply("As I said, his real name cannot be shown.");
    }
    else if (
        last.includes("d-os is a html os, made by the amados owner, m4.") &&
        (input.includes("rlly") || input.includes("really"))
    ) {
        appendReply("Yes, it is true, no need to be surprised.");
    }
    else if (
        last.includes("i was made by amados") &&
        input.includes("why")
    ) {
        appendReply("The reason why I can't answer some questions is because they might not be in my JavaScript 'question list'. I was made to help people that want to know more about D-OS.");
        appendReply("Also, I am a Q&A bot — that's why I rely on a defined 'question list'.");
    }
    // Follow-up for help state
    else if (
        conversationState === "help_prompt" &&
        (
            input.includes("how to turn on d-os") ||
            input.includes("how to turn on d-os?") ||
            input.includes("how do i activate d-os") ||
            input.includes("how do i activate d-os?")
        )
    ) {
        appendReply("To activate D-OS, open the D-OS Emulator (or the official D-OS 1 website, if you are using D-OS 1). Then, if you are in the D-OS Emulator, choose the D-OS version you want to use, and then find the 'D-OS' button. If you are using D-OS 1, just click the 'Try Now' button on the website.");
        appendReply("If you are having issues, just tell me, and I will try to help or tell AmadOS about it.");
    }
    else {
        appendReply("Hmm, I can't provide more details on that yet. Try asking a specific question.");
    }

    conversationState = ""; // Reset after handling follow-up
}

// ⏎ Auto-send on Enter
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        getAnswer();
    }
});
