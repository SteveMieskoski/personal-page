$(document).ready(function () {
    var boxone = $('.box-one');
    var boxtwo = $('.box-two');
    var boxthree = $('.box-three');
    var boxfour = $('.box-four');
    var boxfive = $('.box-five');
    var boxsix = $('.box-six');
    var boxseven = $('.box-seven');
    var boxeight = $('.box-eight');
    var boxnine = $('.box-nine');
    var one = $('.one');
    var two = $('.two');
    var three = $('.three');
    var four = $('.four');
    var five = $('.five');
    var six = $('.six');
    var seven = $('.seven');
    var eight = $('.eight');
    var nine = $('.nine');
    var board = $('.board');

    var boardSlots = {
        1: {available: true, choice: one},
        2: {available: true, choice: two},
        3: {available: true, choice: three},
        4: {available: true, choice: four},
        5: {available: true, choice: five},
        6: {available: true, choice: six},
        7: {available: true, choice: seven},
        8: {available: true, choice: eight},
        9: {available: true, choice: nine}
    };


    var playerSym;
    var compSym;
    var human = [];
    var comp = [];
    var begin = false;


    $('.X').click(function () {
        playerSym = 'X';
        compSym = 'O';
        begin = true;
        board.removeClass('disable-click');
        $('.mark-select').remove();
    });

    $('.O').click(function () {
        playerSym = 'O';
        compSym = 'X';
        begin = true;
        board.removeClass('disable-click')
    });


    boxone.on('click', {num: 1}, turnControl);
    boxtwo.on('click', {num: 2}, turnControl);
    boxthree.on('click', {num: 3}, turnControl);
    boxfour.on('click', {num: 4}, turnControl);
    boxfive.on('click', {num: 5}, turnControl);
    boxsix.on('click', {num: 6}, turnControl);
    boxseven.on('click', {num: 7}, turnControl);
    boxeight.on('click', {num: 8}, turnControl);
    boxnine.on('click', {num: 9}, turnControl);
    $('.reset').click(reset);

    function turnControl(event) {
        if (boardSlots[event.data.num].available) {
            boardSlots[event.data.num].available = false;
            human.push(event.data.num);
            makeSelection(event.data.num, playerSym);
            compPlayer(event.data.num);
        }
        if(checkWin(human)){
            Win();
            resetingAnim();
            setTimeout(resetingAnim, 1500);
            setTimeout(reset, 1000);

        } else if(checkWin(comp)){
            WinComp();
            resetingAnim();
            setTimeout(resetingAnim, 1500);
            setTimeout(reset, 1000);
        }

    }

    function compPlayer(humanSelected) {

        var compSelected = humanSelected < 5 ? humanSelected + 4 : humanSelected - 2;

        if (checkPotential(compSelected)) {

        } else {
            for (var i = 1; i < 9; i++) {
                checkPotential(i);
            }
        }

        function checkPotential(num) {
            if (boardSlots[num].available) {
                comp.push(num);
                makeSelection(num, compSym);
                boardSlots[num].available = false;
                return true;
            }
        }

    }


    function makeSelection(num, sym) {

        if (sym == 'X') {
            boardSlots[num].choice.text('X')
        } else {
            boardSlots[num].choice.text('O')
        }
    }

    function Win() {
        $('.win').removeClass('game-result');
    }

    function WinComp(){
        $('.lost').removeClass('game-result');
    }

    function Tie() {
        $('.tie').removeClass('game-result');
        resetingAnim();
        setTimeout(resetingAnim, 1500);
        setTimeout(reset, 1000);
    }

    function checkWin(arrArg) {
        var arrCheck = [];
        var markWinArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
        for (var i = 0; i < markWinArray.length; i++) {
            for (var j = 0; j < 3; j++) {
                if (arrArg.indexOf(markWinArray[i][j]) > -1) {
                    arrCheck.push(true)
                } else {
                    arrCheck.push(false)
                }
            }
            if (arrCheck.indexOf(false) < 0) {
                return true
            }
            arrCheck = [];
        }
        if ((comp.length + human.length) === 9) {
            return Tie();
        } else {
            return false;
        }

    }


    function reset(){
        boardSlots = {
            1: {available: true, choice: one},
            2: {available: true, choice: two},
            3: {available: true, choice: three},
            4: {available: true, choice: four},
            5: {available: true, choice: five},
            6: {available: true, choice: six},
            7: {available: true, choice: seven},
            8: {available: true, choice: eight},
            9: {available: true, choice: nine}
        };



        var playerSym;
        var compSym;
        human = [];
        comp = [];
        begin = false;

        resetingAnimIn();
        setTimeout(resetingAnimIn, 2000);

        one.text('');
        two.text('');
        three.text('');
        four.text('');
        five.text('');
        six.text('');
        seven.text('');
        eight.text('');
        nine.text('');
        $('.win').addClass('game-result');
        $('.lost').addClass('game-result');
        $('.tie').addClass('game-result');

    }



    function resetingAnim(){
        board.toggleClass('anim scale-y');
    }
    function resetingAnimIn(){
        board.toggleClass(' scale-x');
    }

});



