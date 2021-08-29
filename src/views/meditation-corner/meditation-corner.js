import BaseView from '../baseView.js';

let meditationCornerStyle = `

`;

class MeditationCornerView extends BaseView {
    constructor() {
        super();
        this.setTitle('Name - Meditation Corner');
    }
    async getHtml() {
        let htmlString = `
        <body onload="slide()">
        <!--The music selector-->
        <div class="scroll-container">
            <div class="scroll-page" id="page-1">
                <label for="myAudio1">MELODY OF NATURE</label>
                <audio id="myAudio1" controls>
                    <source src="music/melody-of-nature-main-6672.mp3" type="audio/mpeg">
                </audio>
            </div>
            <div class="scroll-page" id="page-2">
                <label for="myAudio2">IN THE FOREST</label>
                <audio id="myAudio2" controls>
                    <source src="music/music1.mp3" type="audio/mpeg">
                </audio>
            </div>
            <div class="scroll-page" id="page-3">
                <label for="myAudio3">TIBETAN RELAXATION</label>
                <audio id="myAudio3" controls>
                    <source src="music/music1.mp3" type="audio/mpeg">
                </audio>
            </div>
        </div>
    
    
    
        <!--Button presets-->
        <div class="buttons">
            <button class="mood_b_fresh mood_b" onclick="document.getElementById('myAudio1').play();">
    
            </button>
    
            <button class=" mood_b_rainy mood_b">
    
            </button>
    
            <button class="mood_b_mountains mood_b">
    
            </button>
    
        </div>
    
    
        <!--Slideshow-->
        <div class="container">
            <div class="mySlides">
                <video controls loop>
                    <source src="ocean.mov" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="mySlides">
                <img id="123" src="ezgif-4-67b4af989318.gif" alt="this slowpoke moves" width="50%" height="50%" />
                <button>
                    click me</button>
            </div>
    
    
            <a class="prev" onclick="plusSlides(-1)">❮</a>
            <a class="next" onclick="plusSlides(1)">❯</a>
    `;
        htmlString += ('<style>' + meditationCornerStyle + '</style>')
        return htmlString;
    }
}

export {
    MeditationCornerView
};