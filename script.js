const API_KEY = "API_KEY";

const input = document.getElementById("user-input");
const result = document.getElementById("result");

const getInput = () => input.value.trim();

const callGemini = async(prompt) => {
    try {
        const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`,           
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key" : API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

if(!response.ok) {
    const error = await response.json();
    console.log(error);
    return error.error.message;
}

const data = await response.json();

 return data.candidates[0].content.parts[0].text;

    } catch(error) {
        console.log(error);
        return "Error aa gya";
    }
};


const showLoading = (msg) => {
    result.innerText = msg;
};

const askMeAnything = async () => {
    let input = getInput();

    if(!input) {
        alert("Question likho");
        return;
    }

    showLoading("Thinking...");

    let prompt = `Anser this question.......... ${input}`;

    let answer = await callGemini(prompt);

    result.innerText = answer;

};


const summarizer = async () => {

  let input = getInput();

  if (!input) {
    alert("Text likho 😅");
    return;
  }

  showLoading("Summarizing... ✂️");

  let prompt = `Summarize this in short bullet points: ${input}`;

  let answer = await callGemini(prompt);

  
  let lines = answer.split("\n");

  let formatted = lines.map(line => `👉 ${line}`);

  result.innerHTML = formatted.join("<br>");
};


const ideaSpark = async () => {

  let input = getInput();

  if (!input) {
    alert("Topic likho 😅");
    return;
  }

  showLoading("Generating ideas... 💡");

  let prompt = `Give 5 creative ideas about ${input}`;

  let response = await callGemini(prompt);

  let ideas = response.split("\n");

  let formatted = ideas.map(item => `💡 ${item}`);

  result.innerHTML = formatted.join("<br>");
};


const definitionFinder = async () => {

  let input = getInput();

  if (!input) {
    alert("Word likho 😅");
    return;
  }

  showLoading("Finding meaning... 📖");

  let prompt = `Explain "${input}" in simple words with example`;

  let answer = await callGemini(prompt);

  result.innerText = answer;
};