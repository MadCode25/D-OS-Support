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
    conversationState = "";
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
    conversationState = "";
}

function getAnswer() {
    const inputElement = document.getElementById("userInput");
    const input = inputElement.value.toLowerCase().trim();
    inputElement.value = "";

    // Follow-up check
    const isFollowUp = [
        "why", "how", "tell me more", "explain more", "what do you mean",
        "what's that", "what is that", "really", "yes", "please", "sure", "yep", "yeah", "yup", "ok", "okay", "yes please"
    ].some(phrase => input.includes(phrase));

    if (isFollowUp && lastBotMessage) {
        handleFollowUp(input);
        return;
    }

    // --- MAIN BOT RESPONSES ---
    if (input.includes("hello") || input.includes("hi") || input.includes("hey") || input.includes("greetings")|| input.includes("sup") || input.includes("yo")) {
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
        appendReply("Yep! They do have other OSes, they have 2 kinds of OSes other than D-OS, 1 is G-OS, 2 is Windows WTV, but unfortunately, Windows WTV, is discontinued, due to M4 not having enough time to maintain it.");
    }

    else if (input.includes("what is amados")) {
        appendReply("AmadOS is a small system, controlled by one person, the person's name was M4. AmadOS makes OSes like D-OS, Windows WTV, and G-OS.");
    }

    else if (input.includes("what is d-os") || input.includes("what's d-os")) {
        appendReply("D-OS is a HTML OS, made by the AmadOS owner, M4.");
    }

    else if (input.includes("who made you") || input.includes("who made u")) {
        appendReply("I was made by AmadOS, to help users of D-OS like you to know more about D-OS.");
    }

    else if (input.includes("i need help with d-os") || input.includes("i need help")) {
        appendReply("Sure! What do you need help with regarding D-OS?");
        conversationState = "help_prompt";
    }

    else if (input.includes("does d-os have a start menu") || input.includes("does D-OS have a start menu")) {
        appendReplyItalic("Looking up in AmadOS' website...");
        setTimeout(function () {
            appendReply("According to AmadOS' website, both D-OS 2 and D-OS 3 have a start menu, but D-OS 1 has an 'Uppertab' at the top instead. \n Question: Do you want me to explain how to activate D-OS?");
        }, 1200);
    }

    else if (input.includes("what's your version") || input.includes("What's your version") || input.includes("what is your version") || input.includes("What is your version") || input.includes("what version are you") || input.includes("What version are you")) {
        appendReply("My version is Alpha 0.1.8, released in September, 21, 2025.");
    }

    else if (input.includes("thanks") || input.includes("thank you")) {
        appendReply("You're welcome! If you have more questions, feel free to ask.");
    }

    else if (input === "oh") {
        appendReply("Oh? Do you want to know more about D-OS?");
    }

    // --- SINGLE fallback (only runs if no above matches) ---
    else {
        appendReplyItalic("(D-OS cannot understand your question, please try to ask something else or ask something related to D-OS.)");
    }
}

// 📌 Handle follow-up questions
function handleFollowUp(input) {
    const last = lastBotMessage.toLowerCase();

    if (last.includes("i am a chatbot")) {
        appendReply("I was built using JavaScript to support users on AmadOS' D-OS platform.");
    }
    else if (last.includes("they do have other oses")) {
        appendReply("G-OS was the first AmadOS OS (GreenOS). Windows WTV has a Windows 95-like interface with draggable windows and a start menu.");
    }
    else if (last.includes("d-os is a html os")) {
        appendReply("Yes, and the latest version is D-OS 3 with a modern interface.");
    }

    else if (last.includes("Do you want me to explain how to activate D-OS")) {
        appendReply("Great! To activate D-OS, open the D-OS Emulator (or the official website of D-OS 1), then, choose your preffered version, then search for a button labeled 'D-OS (Version no.)', click it, then wait for D-OS to activate.")
    }

    else if (last.includes("unfortunately, windows wtv, is discontinued") && input.includes("that's sad") || input.includes("aw man")) {
        appendReply("Yep, it is pretty depressing, but for now, M4 might need to focus on D-OS and G-OS, since a lot of users had a lot of issues with G-OS' interface.");
    }

    else if (conversationState === "help_prompt" && input.includes("activate d-os")) {
        appendReply("To activate D-OS, open the D-OS Emulator, choose a version, then press the 'D-OS' button.");
    }
    else {
        appendReply("Hmm, I don’t know how to answer that yet. Try rephrasing?");
    }

    conversationState = "";
}

// ⏎ Auto-send on Enter
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        getAnswer();
        animateTitleBar();
    }
});

document.getElementById("sendButton").addEventListener("click", function () {
    getAnswer();
    animateTitleBar();
});

// 🎬 Title bar animation
function animateTitleBar() {
    const titleBar = document.getElementById("titleBar");
    titleBar.classList.remove("glideUp");
    void titleBar.offsetWidth; // reflow
    titleBar.classList.add("glideUp");
}


function closeMessage() {
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.style.display = "none";
}
