
const phrases = ["Hey, I'm flurri!", "abooby is smarter", "photop.live", "never gonna give you up.", "🤨"];
const content = document.getElementById('content').querySelector('span');
function randomPhrase() {
    content.innerText = "";
    let current = "";
    const text = phrases[Math.floor(Math.random() * phrases.length)];;
    let index = 0;

    const loop = setInterval(() => {
        current += text[index];
        content.innerText = current;
        index++;
        if (index >= text.length) {
            clearInterval(loop);
        }
    }, 50);
}

//Resize
resize = () => {
    if (window.innerWidth < 1104) {
        //too lazy to make it responsive
        document.body.style.display = 'none';
    } else {
        document.body.style.display = 'block';
    }
}
window.addEventListener('resize', resize);

const textEditContent = document.getElementById('content');
const windows = document.getElementById('windows');
const tabs = document.getElementById('tabs');

let pageContent = false;

updatePage = () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
        if (pageContent) pageContent.setAttribute('hidden', true);
        textEditContent.style.right = '100%';
        windows.style.right = '100%';
        tabs.style.left = '10%';
        pageContent = document.getElementById(hash);
        pageContent.removeAttribute('hidden');
        document.title = `flurri | ${hash}`
    } else {
        if (pageContent)
            pageContent.setAttribute('hidden', true);
        textEditContent.style.left = '810px;';
        windows.style.right = '40%';
        tabs.style.left = '67%';
        document.title = 'flurri'
        randomPhrase();
    }
}

updatePage();

window.addEventListener('hashchange', updatePage);

const tauser = document.getElementById("tauser");
tauser.addEventListener('click', () => {
   let honk = new Audio("/assets/honk.mp3");
   honk.play()
});
