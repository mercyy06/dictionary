"use strict";
const WORD_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const search = document.getElementById("search");
const sound = document.getElementById("sound");
const searchButton = document.getElementById("searchButton");
const output = document.getElementById("output");
const btnIcon = document.querySelector(".btn-icon");

const fetchWord = async (word) => {
  try {
    const answer = await fetch(WORD_API_URL + word);
    const data = await answer.json();
    console.log(data);
    output.innerHTML = "";

    if (data.title) {
      output.innerHTML = `<div class='error-message'><h2>${data.title}</h2> <p>${data.message}</p></div>`;
    }
    data.forEach((entry, entryIndex) => {
      const outputDiv = document.createElement("div");
      outputDiv.classList.add("output-div");

      const wordHeading = document.createElement("div");
      wordHeading.innerHTML = `<div class='word-heading'><h3 class='word-text'>${
        entry.word
      } (${entryIndex + 1})</h3></div>`;
      outputDiv.appendChild(wordHeading);

      const wordPhonetic = document.createElement("div");
      wordPhonetic.innerHTML = `<div class='phonetic'><p class='phonetic-text'>${
        entry.phonetic || ""
      }</p></div>`;
      outputDiv.appendChild(wordPhonetic);

      // const wordAudio = document.createElement('audio');

      entry.meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          const definitionDiv = document.createElement("div");
          definitionDiv.classList.add("definition");
          // const wordDefinition = document.createElement("p");
          definitionDiv.innerHTML = ` <div class='word-definition'>
      <span class='partofspeech-text'>(${meaning.partOfSpeech || ""})</span>
      <span class='definition'>${definition.definition}</span>
    </div>`;

          if (definition.example) {
            const exampleDiv = document.createElement("div");
            exampleDiv.classList.add("word-example");
            exampleDiv.textContent = `${definition.example}`;
            definitionDiv.appendChild(exampleDiv);
          }

          outputDiv.appendChild(definitionDiv);
        });
      });

      // entry.phonetics.forEach((phonetic) => {
      //   if (phonetic.audio) {
      //     // phoneticDiv.innerHTML = `<button class="btn-icon"><i class="fa-solid fa-volume-high"></i></button>`;
      //     const btn = outputDiv.querySelector(".btn-icon");
      //     btn.addEventListener("click", function () {
      //       const audio = document.getElementById("sound");
      //       // playAudio(`https:${phonetic.audio || ""}`);
      //       audio.src = phonetic.audio.startsWith("https")
      //         ? phonetic.audio
      //         : `https:${phonetic.audio}`;
      //       audio.play();
      //       //
      //       console.log("sound played");
      //     });
      //     outputDiv.appendChild(phoneticDiv);
      //   }
      // });

      output.appendChild(outputDiv);
      // output.appendChild(none);
      // output.appendChild(wordMeaning);
    });
  } catch (error) {
    // console.error("theres no word like that");
    // output.textContent = "Theres no word like that...";
  }
};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  const word = search.value.trim();
  if (!word) {
    alert("pls search for a word");
  } else {
    fetchWord(word);
  }
});

// window.addEventListener("load", function (e) {
//   const statusDisplay = document.getElementById("status");
//   statusDisplay.textContent = navigator.onLine ? 'online' : "offline";
// });

// btnIcon.addEventListener("click", function () {
//   playAudio(`https:${phonetics.audio}`);
//   // console.log('sound played ');
// });
