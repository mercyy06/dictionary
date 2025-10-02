"use strict";
const WORD_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const search = document.getElementById("search");
const sound = document.getElementById("sound");
const searchButton = document.getElementById("searchButton");
const output = document.getElementById("output");

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
      } (${
        entryIndex + 1
      })</h3>          <button class="btn-icon"><i class="fa-solid fa-volume-high"></i></button></div>`;
      outputDiv.appendChild(wordHeading);

      const wordPhonetic = document.createElement("div");
      wordPhonetic.innerHTML = `<p class='phonetic-text'>${entry.phonetic}</p>`;
      outputDiv.appendChild(wordPhonetic);

      // const wordAudio = document.createElement('audio');

      entry.meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          const definitionDiv = document.createElement("div");
          definitionDiv.classList.add("definition");
          const wordDefinition = document.createElement("p");
          wordDefinition.innerHTML = `<div class='word-definition'><p class='definition'>${definition.definition}</p></div>`;
          // outputDiv.appendChild(wordDefinition);
          definitionDiv.appendChild(wordDefinition);
          outputDiv.appendChild(definitionDiv);
        });
      });

      // entry.meanings.forEach((meaning) => {
      //   meaning.partOfSpeech.forEach((partOfSpeech) => {
      //     const partOfSpeechP = document.createElement("p");
      //     // partOfSpeechP.innerHTML = `<p>${entry.partOfSpeech}<p>`;
      //     partOfSpeechP.textContent = `${partOfSpeech.partOfSpeech}`;

      //     wordPhonetic.appendChild(partOfSpeech);
      //   });
      // });

      entry.meanings.forEach((meaning) => {
        const partOfSpeechP = document.createElement("p");
        partOfSpeechP.textContent = meaning.partOfSpeech;
        wordPhonetic.appendChild(partOfSpeechP);
      });

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
