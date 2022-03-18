window.addEventListener('DOMContentLoaded', (event) => {
    const usMap = document.getElementsByTagName('path')
    const nextButton = document.getElementById('next-btn');
    nextButton.classList.add('hide')
    const addMouseover = function (e) {
                    e.stopPropagation()
                    if (e.target.tagName == 'path') {
                        var content = e.target.dataset.name;
                        var content_id = e.target.dataset.id;
                        
                        boxInfo.style.display = "block";
                        boxInfo.innerHTML = content + " " + content_id;
                        
                        boxInfo.style.opacity = "100%";
                    }
                 
                }

    const addMouseout =  function(e){
                    e.stopPropagation()
                    boxInfo.style.opacity = "0%"
                }
    
    let gameModeBtn = document.getElementById("checkbox");
    var boxInfo = document.getElementById('details-box');
    gameModeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('event game mode',e)
            

        if (e.target.checked) {
            console.log(gameModeBtn.checked, 'target checked')
            for (let i = 0; i < usMap.length; i++) {
                usMap[i].addEventListener('mouseover', addMouseover);

                usMap[i].addEventListener('mouseout',addMouseout)

                window.onmousemove = function (e) {
                    var x = e.clientX;
                    var y = e.clientY;
                    boxInfo.style.top = (y + 25) + 'px';
                    boxInfo.style.left = (x) + 'px';
                };
            }
        } else if (!e.target.checked) {
            console.log(gameModeBtn.checked)
            for (let i = 0; i < usMap.length; i++) {

                usMap[i].removeEventListener('mouseover', addMouseover)
                usMap[i].removeEventListener('mouseout', addMouseout)
            }
        }
        })
            //------------------------------------>>>>>>>>>>>>>>>>>
           var gameMode = false;
           let roundComplete = false
            // game mode
            
            const startButton = document.getElementById('start-btn');
            const totalScoreHeader = document.getElementById('totalScore');
            const questionContainer = document.getElementById('question');
            var allStates = document.getElementsByTagName('path');
            document.getElementById("rightGuesses").innerHTML = '0' + " Right"
            document.getElementById("wrongGuesses").innerHTML = "0"+ " Missed";
            var previousQuestions = [];
            var listOfWrongGuesses = []
            var rightList = []
            
            
            let guessedRight = 0
            let guessedWrong = 0
            let numOfChances = 5
            
            function decrementNumOfChances() {
                numOfChances -= 1
            }
            
            function incrementScore() {
                guessedRight += 1
                
                document.getElementById("rightGuesses").innerHTML = guessedRight + " Right";
            }
            
            function incrementWrong() {
                guessedWrong += 1
                document.getElementById("wrongGuesses").innerHTML = guessedWrong + " Missed";
            }

            
            function totalScore() {
                switchButtonsInit()
                // roundComplete = true 
                // document.getElementById("timer").innerHTML = 'Play Again?'
                questionContainer.innerHTML = ''
                toggleModal()
                // resetConf()
            }
            
            function switchButtons(){
                startButton.classList.add('hide')
                nextButton.classList.remove('hide')
            }
            
            function switchButtonsInit(){
                startButton.classList.remove('hide')
                nextButton.classList.add('hide')
            }
            
            function resetConf() {
                mapColorsDefault()
                document.getElementById("rightGuesses").innerHTML = '0' + " Right"
                document.getElementById("wrongGuesses").innerHTML = "0"+ " Missed";
                previousQuestions = [];
                listOfWrongGuesses = []
                rightList = []
                nextButton.classList.add('hide')
                // document.getElementById("timer").innerHTML = 'Play Again?'
            
                //reset toggle modal####
                console.log(document.getElementById("myList").childNodes[0])
                console.log(document.getElementById("myList"), 'from reset')
            //  roundComplete = false
             guessedRight = 0
             guessedWrong = 0
             numOfChances = 5
            }

            
            //starts the game s1
            startButton.addEventListener('click', startGame)
            function startGame() {
                // resetConf()
                document.getElementById("myList").innerHTML = '' 
                switchButtons()
                roundComplete = false
                gameMode = true;
                gameRound()
            }
            
            // step 2
            function gameRound() {
                // roundComplete = true
                mapWithOnlyGreens()
                decrementNumOfChances()
                if (numOfChances > 0) {
                    nextQuestion()
                    countdown()
                } else {
                    roundComplete = true
                    totalScore()
                    resetConf()
                }
            }
            
            function currentQuestonPush() {
                listOfWrongGuesses.push(previousQuestions[previousQuestions.length - 1])
            }


            function mapColorsDefault() {
                for (let i = 0; i < usMap.length; i++) {
                    document.getElementById(usMap[i].id).style.fill = "rgb(79, 82, 82)"
                }
            }
            

            function mapWithOnlyGreens() {
                //  console.log(listOfWrongGuesses)
                for (let i = 0; i < listOfWrongGuesses.length; i++) {
                    let stateName = listOfWrongGuesses[i]
                    // console.log('hello')
                    document.querySelector(`[data-name='${stateName}']`).style.fill = "rgb(79, 82, 82)"
                }
            }
            
            //give a random state question
            nextButton.addEventListener('click', nextQuestion)
            
            function nextQuestion() {
                mapWithOnlyGreens()
                let idx = Math.floor(Math.random() * (allStates.length - 1))
                let state = allStates[idx].dataset.name
                
                if (!previousQuestions.includes(state) && numOfChances > 0 ) {
                    previousQuestions.push(state);
                    questionContainer.innerHTML = "Where is " + state + "?"
                } else if (numOfChances === 0){
                    questionContainer.innerHTML = ''
                } else {
                    gameRound()
                }
            }
            

            function countdown() {
                let timeleft = 10;
                const inner = setInterval(function(){
                    // console.log('round complete', roundComplete)
                //  if (timeleft >= 0)
                    if (roundComplete) {
                        console.log('round complete', roundComplete)
                         document.getElementById("timer").innerHTML = '0'
                         timeleft = 0
                         return
                        }
                    let num = document.getElementById("timer").innerHTML = timeleft;
                    if (num === 1) {currentQuestonPush()}
                    timeleft -= 1;
                    if (timeleft < 0) {
                        incrementWrong()
                        clearInterval(inner);
                        gameRound()
                        return
                    }
            }, 1000);
        }

        //Right or wrong logic and change color
        
        for (let i = 0; i < usMap.length; i++) {

            usMap[i].addEventListener('click', function(e) {
                e.stopPropagation()
                let clickedState = e.target.dataset.name
               
                let stateId = e.target.dataset.id;
                if (clickedState === previousQuestions[previousQuestions.length - 1]){
                        rightList.push(clickedState)
                        document.getElementById(stateId).style.fill = 'rgb(0, 131, 28)';
                        incrementScore();
                        nextQuestion();
                    } else {
                        if (gameMode) {
                        incrementWrong();
                        // console.log(clickedState)
                        listOfWrongGuesses.push(clickedState)
                        // console.log(listOfWrongGuesses)
                        document.getElementById(stateId).style.fill = 'rgb(161, 0, 0)';
                        }
                    }
            })
        }


            const theList = document.getElementById('myList')
            const modal = document.querySelector(".modal");
            const closeButton = document.querySelector(".close-button");
            closeButton.addEventListener("click", toggleModal);
            
        function toggleModal() {
            // roundComplete = true
            var t = document.createTextNode('Study these states: ' + [...new Set(listOfWrongGuesses)].join(', ')); 
            totalScoreHeader.innerHTML = ('Your score: ' + guessedRight + ' / 10' )
            theList.appendChild(t)
            modal.classList.toggle("show-modal");
        }

            const info = document.getElementById('info')
            const info2 = document.getElementById('info2')
            const modal2 = document.querySelector(".modal2");
            const closeButton2 = document.querySelector(".close-button2");
            closeButton2.addEventListener("click", toggleModal2);
            const infoButton = document.getElementById('info-btn');
            infoButton.addEventListener('click', toggleModal2)

        function toggleModal2() {
            info.innerHTML = ('STUDY MODE: Click on the slider on the top left of your screen to activate the study mode. Hover over each state to visualize its name and memorize it. When done, switch to the game mode' )
            info2.innerHTML = ('GAME MODE: You will be prompted a state name to find on the map. Click on the map where you believe the state to be located. If your guess is correct the state color will turn green and 1 pt will be counted towards your accurate score. Otherwise, it will turn red and 1 pt will be counted toward your inaccurate score. You have 10 seconds to locate each state and 10 states to locate.' )
            
            modal2.classList.toggle("show-modal2");
        }
        

    })