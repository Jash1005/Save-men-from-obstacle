document.addEventListener('DOMContentLoaded', () => {
    const men = document.querySelector('.men');
    const obstacle = document.querySelector('.obstacle');
    const gameoverwin = document.querySelector('.winscore');
    const gameoverloss = document.querySelector('.lossscore');
    const winscore = document.querySelector('.winscore span');
    const lossscore = document.querySelector('.lossscore span');
    let win = 0;
    let loss = 0;
    let leftpos = 150;
    let gofront = 10;
    const containerWidth = document.querySelector('.game-container').offsetWidth;
    let menWidth = parseInt(men.offsetWidth);
    
    audio = new Audio('music.mp3');
    gameoveraudio = new Audio('gameover.mp3');
    

    // Start obstacle animation on any key press
    document.onkeydown = function(e) {
        console.log("Key pressed is: " + e.keyCode);
        
        // Start obstacle animation if not already started
        if (!obstacle.classList.contains('animate_obstacle')) {
            men.style.left = '0px';
            obstacle.classList.add('animate_obstacle');
        }

        setTimeout(()=>{
            audio.play()
       },1000);

        if (e.keyCode == 38) {
            men.classList.add('animate_men');
           // men.style.left = `${parseInt(window.getComputedStyle(men,null).getPropertyValue('left')) +leftpos}px`;

            setTimeout(() => {
                men.classList.remove('animate_men');
            }, 800);
        }
        
        let actualpos = parseInt(window.getComputedStyle(men,null).getPropertyValue('left'));
        let rightpos = parseInt(window.getComputedStyle(men,null).getPropertyValue('right'));

        if(e.keyCode == 39 && rightpos > 0) {
            men.style.left = `${actualpos + gofront}px`;
        }

        if(e.keyCode == 37 && actualpos >= 20) {
            men.style.left = `${actualpos - gofront}px`;
        }
    }

    // Check for collision every 100ms
    setInterval(() => {

        let mx = parseInt(window.getComputedStyle(men, null).getPropertyValue('left'));
        let my = parseInt(window.getComputedStyle(men, null).getPropertyValue('bottom'));
        let mr = parseInt(window.getComputedStyle(men, null).getPropertyValue('right'));

        let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

        let diff_x = Math.abs(mx - ox);
        let diff_y = Math.abs(my - oy);

        console.log(diff_x, diff_y);

        if (diff_x < 50 && diff_y < 30) {
            obstacle.classList.remove('animate_obstacle');
            lossscore.innerHTML = ++loss;
            men.style.left ='0px';
            gameoveraudio.play();
            setTimeout(()=>{
                audio.pause();
                gameoveraudio.pause();
            },1000);
        }
        
        if (mx + menWidth >= containerWidth - 50) { // Win condition
            winscore.innerHTML = ++win;
            obstacle.classList.remove('animate_obstacle');
            men.style.left = '0px';
            
        }
        
        let distanceToFinish = containerWidth - (mx + menWidth);
        let newAnimationDuration = 4.5 - (1.5 * (1 - (distanceToFinish / containerWidth))); // Speed up as distance decreases
        obstacle.style.animationDuration = `${newAnimationDuration}s`;

    }, 100);

});
