const surahSelect = document.getElementById('surah-select');
    const ayahSelect = document.getElementById('ayah-select');
    const ayahDisplay = document.getElementById('ayah-display');
    const translationDisplay = document.getElementById('translation-display');
    const playAudioBtn = document.getElementById('play-audio');
    const saveStatusBtn = document.getElementById('save-status');
    const statusSelect = document.getElementById('status-select');
    const progressList = document.getElementById('progress-list');
    const challengeAyahDiv = document.getElementById('challenge-ayah');
    const challengeTranslationDiv = document.getElementById('challenge-translation');
    const reciterSelect = document.getElementById('reciter-select');
    const themeSelect = document.getElementById('theme-select');
    const languageSelect = document.getElementById('language-select');

    let allSurahs = [];
    let currentSurah = null;
    let currentAyah = null;
    let reciter = "ar.alafasy";
    let language = "en";
    let memorizedStatus = JSON.parse(localStorage.getItem('memorizedStatus') || '{}');

    function loadSurahs() {
      fetch("https://api.alquran.cloud/v1/surah")
        .then(res => res.json())
        .then(data => {
          allSurahs = data.data;
          renderSurahOptions(allSurahs);
        });
    }

    function renderSurahOptions(surahList) {
      surahSelect.innerHTML = `<option disabled selected>Select Surah</option>`;
      surahList.forEach(surah => {
        const option = document.createElement("option");
        option.value = surah.number;
        option.textContent = `${surah.number}. ${surah.englishName}`;
        surahSelect.appendChild(option);
      });
    }

    function loadAyahs(surah) {
      fetch(`https://api.alquran.cloud/v1/surah/${surah}`)
        .then(res => res.json())
        .then(data => {
          ayahSelect.innerHTML = `<option disabled selected>Select Ayah</option>`;
          data.data.ayahs.forEach(ayah => {
            const option = document.createElement("option");
            option.value = ayah.numberInSurah;
            option.textContent = `Ayah ${ayah.numberInSurah}`;
            ayahSelect.appendChild(option);
          });
        });
    }

    function displayAyah(surah, ayah) {
      if (!surah || !ayah) return;
      currentSurah = surah;
      currentAyah = ayah;
      fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.alafasy`)
      .then(res => res.json())
      .then(data => {
        const arabicText = data.data.text || "Ayah not found";
        const tajweedText = applyTajweedColoring(arabicText);
        ayahDisplay.innerHTML = tajweedText;
      });
      function applyTajweedColoring(text) {
        return text
          .replace(/ن/g, '<span class="tajweed-noon">ن</span>')
          .replace(/م/g, '<span class="tajweed-meem">م</span>')
          .replace(/ق/g, '<span class="tajweed-qaf">ق</span>');
      }

      fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${language}.asad`)
        .then(res => res.json())
        .then(data => {
          translationDisplay.textContent = data.data.text || "Translation not found";
        });
    }

    function playAudio(surah, ayah) {
      if (!surah || !ayah) return;
      fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${reciter}`)
        .then(res => res.json())
        .then(data => {
          if (data.data.audio) {
            new Audio(data.data.audio).play();
          }
        });
    }

    function saveMemorizationStatus() {
      if (currentSurah && currentAyah) {
        const key = `${currentSurah}:${currentAyah}`;
        memorizedStatus[key] = statusSelect.value;
        localStorage.setItem('memorizedStatus', JSON.stringify(memorizedStatus));
        updateProgress();
        alert(`Saved status: ${statusSelect.value}`);
      }
    }

    function updateProgress() {
      progressList.innerHTML = '';
      if (Object.keys(memorizedStatus).length === 0) {
        progressList.textContent = "No progress yet.";
        return;
      }
      for (let key in memorizedStatus) {
        const div = document.createElement('div');
        div.textContent = `Surah:Ayah ${key} - Status: ${memorizedStatus[key]}`;
        progressList.appendChild(div);
      }
    }

    function loadDailyChallenge() {
      const surah = Math.floor(Math.random() * 114) + 1;
      fetch(`https://api.alquran.cloud/v1/surah/${surah}`)
        .then(res => res.json())
        .then(data => {
          const ayahCount = data.data.numberOfAyahs;
          const ayah = Math.floor(Math.random() * ayahCount) + 1;

          fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.alafasy`)
            .then(res => res.json())
            .then(data => {
              challengeAyahDiv.textContent = data.data.text;
            });

          fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${language}.asad`)
            .then(res => res.json())
            .then(data => {
              challengeTranslationDiv.textContent = data.data.text;
            });
        });
    }

    function markChallengeMemorized() {
      alert("Great job memorizing today's challenge!");
    }

    function showPage(pageId) {
      document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
      });
      const selected = document.getElementById(pageId);
      if (selected) {
        selected.classList.remove('hidden');
        selected.classList.add('active');
      }
    }

   

    document.addEventListener("DOMContentLoaded", () => {
      loadSurahs();
      updateProgress();
      loadDailyChallenge();

      document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          showPage(targetId);
          toggleNav();
        });
      });

      surahSelect.addEventListener("change", () => {
        loadAyahs(surahSelect.value);
        ayahDisplay.textContent = "Select an Ayah";
        translationDisplay.textContent = "";
      });

      ayahSelect.addEventListener("change", () => {
        displayAyah(surahSelect.value, ayahSelect.value);
      });

      playAudioBtn.addEventListener("click", () => {
        playAudio(currentSurah, currentAyah);
      });

      saveStatusBtn.addEventListener("click", saveMemorizationStatus);

      reciterSelect.addEventListener('change', () => {
        reciter = reciterSelect.value;
      });
      const targetId = link.getAttribute("href").substring(1);
      showPage(targetId);
    });
  

  // Theme and language selection handling
  themeSelect.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", themeSelect.value === "dark");
  });

  languageSelect.addEventListener("change", () => {
    language = languageSelect.value;
    if (currentSurah && currentAyah) {
      displayAyah(currentSurah, currentAyah);
    }
    loadDailyChallenge();
  });

  reciterSelect.addEventListener("change", () => {
    reciter = reciterSelect.value;
  });

  // Dropdown handlers
  surahSelect.addEventListener("change", () => {
    const surah = surahSelect.value;
    if (surah) {
      loadAyahs(surah);
    }
  });

  ayahSelect.addEventListener("change", () => {
    const surah = surahSelect.value;
    const ayah = ayahSelect.value;
    if (surah && ayah) {
      displayAyah(surah, ayah);
    }
  });

  playAudioBtn.addEventListener("click", () => {
    if (currentSurah && currentAyah) {
      playAudio(currentSurah, currentAyah);
    }
  });

  saveStatusBtn.addEventListener("click", saveMemorizationStatus);

  document.getElementById("restart-progress").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all progress?")) {
      memorizedStatus = {};
      localStorage.removeItem("memorizedStatus");
      updateProgress();
    }
  });

  // Default page view
  showPage("home");