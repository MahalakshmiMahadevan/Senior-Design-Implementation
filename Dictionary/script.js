
const url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/"; // Updated the API URL
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  
  // Clear previous results
  result.innerHTML = "";

  axios.get(`${url}${inpWord}`)
    .then((response) => response.data)
    .then((data) => {
      if (data && data.length > 0) {
        let resultHTML = `
          <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound('${data[0].phonetics[0].audio}')">
              <i class="fas fa-volume-up"></i>
            </button>
          </div>`;
            
        data.forEach((entry) => {
          resultHTML += `
            <div class="details">
              <p><br>${entry.meanings[0].partOfSpeech}</p>
              <p><br>/${entry.phonetics[0].text}/</p>
            </div>`;
  
          entry.meanings.forEach((meaning) => {
            resultHTML += `
              <p class="word-meaning"><br>${meaning.definitions[0].definition}</p>
              <p class="word-example">${meaning.definitions[0].example || ""}</p>`;
  
            if (meaning.synonyms && meaning.synonyms.length > 0) {
              resultHTML += `
                <p class="word-synonyms"><br>Synonyms: ${meaning.synonyms.join(", ")}</p>`;
            }
          });
        });
        result.innerHTML = resultHTML;
      } else {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      }
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = `<h3 class="error">An error occurred while fetching data.</h3>`;
    });
});

// Define the playSound function
function playSound(audioUrl) {
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
