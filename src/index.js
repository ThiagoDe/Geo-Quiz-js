window.addEventListener('DOMContentLoaded', (event) =>{
    const usMap = document.getElementsByTagName('path')
    const nextButton = document.getElementById('next-btn');
    nextButton.classList.add('hide')
    // console.log(usMap)
    const addMouseover = function (e) {
                    e.stopPropagation()
                    // console.log(e)
                    if (e.target.tagName == 'path') {
                        // console.log(e.target.dataset.name)
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
    // console.log(document.querySelector('.switch input[type]'))
    // gameModeBtn.addEventListener('click', gameMode)
    gameModeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log(e)
            
        // })
        //this is the study mode code
        // function studyMode() {

        

        if (e.target.checked) {
            console.log(gameModeBtn.checked)
            for (let i = 0; i < usMap.length; i++) {
                usMap[i].addEventListener('mouseover', addMouseover);

                usMap[i].addEventListener('mouseout',addMouseout)
            // }

                window.onmousemove = function (e) {
                    // console.log(e)
                    var x = e.clientX;
                    var y = e.clientY;
                    boxInfo.style.top = (y + 10) + 'px';
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
            // game mode
            
            const startButton = document.getElementById('start-btn');
            // const nextButton = document.getElementById('next-btn');
            const totalScoreHeader = document.getElementById('totalScore');
            // nextButton.classList.add('hide')
            var questionContainer = document.getElementById('question');
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
                // listOfWrongGuesses.push(previousQuestions[previousQuestions.length -1])
                
                document.getElementById("wrongGuesses").innerHTML = guessedWrong + " Missed";
            }
            
            function totalScore() {
                switchButtonsInit()
                questionContainer.innerHTML = ''
                toggleModal()
                // document.getElementById("timer").innerHTML = 'Your score: ' + guessedRight + ' / 10' 
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
            
                //reset togle modal####
                console.log(document.getElementById("myList").childNodes[0])
                console.log(document.getElementById("myList"))
                // theList.removeChild(theList.childNodes[0])
                // document.getElementById("myList").innerHTML = ''        ############# here
                // document.getElementById("myList").removeChild(document.getElementById("myList").childNodes[0])
             guessedRight = 0
             guessedWrong = 0
             numOfChances = 5
            }
            //starts the game s1
            startButton.addEventListener('click', startGame)
            function startGame() {
                document.getElementById("myList").innerHTML = '' 
                switchButtons()
                gameMode = true;
                gameRound()
            }
            
            function gameRound() {
                mapWithOnlyGreens()
                decrementNumOfChances()
                console.log(numOfChances)
                if (numOfChances > 0) {
                    nextQuestion()
                    countdown()
                } else {
                    totalScore()
                    resetConf()
                }
            }
            
            function currentQuestonPush() {
                listOfWrongGuesses.push(previousQuestions[previousQuestions.length - 1])
            }
            //    var someState = document.getElementById(usMap[0].id)
            //    console.log(someState.style.fill = 'rgb(161, 0, 0)')
            //    console.log(document.getElementById(usMap[0].id)).style.fill = 'rgb(161, 0, 0)'
            function mapColorsDefault() {
                for (let i = 0; i < usMap.length; i++) {
                    document.getElementById(usMap[i].id).style.fill = "rgb(79, 82, 82)"
                }
            }
            
            
            function mapWithOnlyGreens() {
                 console.log(listOfWrongGuesses)
                for (let i = 0; i < listOfWrongGuesses.length; i++) {
                    let stateName = listOfWrongGuesses[i]
                    console.log('hello')
                    document.querySelector(`[data-name='${stateName}']`).style.fill = "rgb(79, 82, 82)"
                }
            }
            
            //give a random state question
            nextButton.addEventListener('click', nextQuestion)
            
            function nextQuestion() {
                mapWithOnlyGreens()
                // console.log('listOfWrongGuesses')

                let idx = Math.floor(Math.random() * (allStates.length - 1))
                let state = allStates[idx].dataset.name
                // console.log(usMap)
                
                if (!previousQuestions.includes(state)) {
                    previousQuestions.push(state);
                    
                    questionContainer.innerHTML = "Where is " + state + "?"
                } else {
                    gameRound()
                }
                
            }
            

        function countdown() {
            let timeleft = 10;
           const inner = setInterval(function(){
                if (timeleft >= 0)

                   var num = document.getElementById("timer").innerHTML = timeleft;
                    if (num === 1) {currentQuestonPush()}
                    timeleft -= 1;
                    if (timeleft < 0) {
                        incrementWrong()
                        clearInterval(inner);
                        gameRound()
                        // currentQuestonPush()
                        // listOfWrongGuesses.push(previousQuestions[previousQuestions.length - 1])
                        return
                    }
            }, 1000);
        }

        //Right or wrong logic and change color
        // console.log(usMap)
        for (let i = 0; i < usMap.length; i++) {

            usMap[i].addEventListener('click', function(e) {
                e.stopPropagation()
                let clickedState = e.target.dataset.name
               
                let stateId = e.target.dataset.id;
                // console.log(stateId)
                // console.log(previousQuestions[previousQuestions.length - 1])
                if (clickedState === previousQuestions[previousQuestions.length - 1]){
                        // console.log(document.getElementById(stateId))
                        rightList.push(clickedState)
                        document.getElementById(stateId).style.fill = 'rgb(0, 131, 28)';
                        incrementScore();
                        nextQuestion();
                    } else {
                        if (gameMode) {
                        incrementWrong();
                        console.log(clickedState)
                        listOfWrongGuesses.push(clickedState)
                        console.log(listOfWrongGuesses)
                        document.getElementById(stateId).style.fill = 'rgb(161, 0, 0)';
                        }
                    }
            })
        }


            const theList = document.getElementById('myList')
            const modal = document.querySelector(".modal");
            const closeButton = document.querySelector(".close-button");
            closeButton.addEventListener("click", toggleModal);
            // console.log(modal)
            
        function toggleModal() {
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
            // console.log(modal)
         
            const infoButton = document.getElementById('info-btn');
            infoButton.addEventListener('click', toggleModal2)
        function toggleModal2() {
            console.log('hi')
            // var t = document.createTextNode('Study these states: ' + [...new Set(listOfWrongGuesses)].join(', ')); 
            info.innerHTML = ('STUDY MODE: Click on the slider on the top left of your screen to activate the study mode. Hover over each state to visualize its name and memorize it. When done, switch to the game mode' )
            info2.innerHTML = ('GAME MODE: You will be prompted a state name to find on the map. Click on the map where you believe the state to be located. If your guess is correct the state color will turn green and 1 pt will be counted towards your accurate score. Otherwise, it will turn red and 1 pt will be counted toward your inaccurate score. You have 10 seconds to locate each state and 10 states to locate.' )
            
            modal2.classList.toggle("show-modal2");
        }
        

    })