const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: '/image/friends-min.jpg',
        text: "Love You All Friends"
    },
    {
        image: '/image/hungry-min.jpg',
        text: " Hungry"
    },
    {
        image: '/image/tired-min.jpg',
        text: " Tired"
    },
    {
        image: '/image/hurt-min.jpg',
        text: " Hurt"
    },
    {
        image: '/image/happy-min.jpg',
        text: " Happy"
    },
    {
        image: '/image/angry-min.jpg',
        text: " Angry"
    },
    {
        image: '/image/sad-min.jpg',
        text: " Sad"
    },
    {
        image: '/image/scared-min.jpg',
        text: " Scared"
    },
    {
        image: '/image/outside-min.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: '/image/home-min.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: '/image/school-min.jpg',
        text: 'College Ceremony'
    },
    {
        image: '/image/love-min.jpg',
        text: 'I Love you'
    }
];

data.forEach(createBox);

function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');

    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}
const message = new SpeechSynthesisUtterance();
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    });
}

function setTextMessage(text) {
    message.text = text;
}

function speakText() {
    speechSynthesis.speak(message);
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();