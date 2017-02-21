$(document).ready(function () {


    var i;
    var one = $('.one');
    var two = $('.two');
    var three = $('.three');
    var four = $('.four');
    var start = $('.start');
    var canClick = $('.can-click');
    var strict = $('.strict');

    var player = false;
    var round = 1;
    var seq;
    var game = true;
    var roundSlice;
    var playerCount = 0;
    var vm = this;

    var audio1 = new Audio('./simonSound1.mp3');
    var audio2 = new Audio('./simonSound2.mp3');
    var audio3 = new Audio('./simonSound3.mp3');
    var audio4 = new Audio('./simonSound4.mp3');
    $('.demo').click(function(){
        audio.play();

    })


    function oneOn() {
        one.toggleClass('one-on')
    }

    function twoOn() {
        two.toggleClass('two-on')
    }

    function threeOn() {
        three.toggleClass('three-on')
    }

    function fourOn() {
        four.toggleClass('four-on')
    }


    function createOrder() {
        var low = Math.ceil(1);
        var high = Math.floor(5);
        return Math.floor(Math.random() * (high - low)) + low;
    }

    function createSequence() {
        var seq = [];
        for (i = 0; i < 20; i++) {
            seq.push(createOrder())
        }
        return seq;
    }

    //=====================================

    var retry = false;
    vm.retry = retry;
    var strictMode = false;
    vm.strictMode = strictMode;

    start.click(function () {
        startGame();
    });

    strict.click(function () {
        startStrictGame();
    });

    //var disposableOne;
    //  var disposableTwo;
    //  var disposableThree;
    //  var disposableFour;
    //  var disposable;

    $('.restart').click(function () {
        vm.retry = true;
        $('.dummny').trigger('click');

    });

    function startGame() {

        round = 0;
        var beginSeq = createSequence();
        vm.obsSeq = Rx.Observable.from(beginSeq);
        vm.retry = false;
        vm.strictMode = false;
        vm.restart = false;
        begin('start', vm.obsSeq);
    }

    function startStrictGame() {
        round = 0;
        var beginSeq = createSequence();
        vm.obsSeq = Rx.Observable.from(beginSeq);
        vm.retry = true;
        vm.strictMode = true;
        vm.restart = false;
        begin('start', vm.obsSeq);
    }

    function endgame() {
        $('.counter').text('Game Over');
        if (vm.strictMode) {
            var disposableNewGame = Rx.Scheduler.default.scheduleFuture(
                'one',
                2000,
                function (scheduler, x) {
                    startStrictGame();
                    disposableNewGame.dispose();
                }
            );
        } else {
            var disposableStrictGame = Rx.Scheduler.default.scheduleFuture(
                'one',
                2000,
                function (scheduler, x) {
                    startGame();
                    disposableStrictGame.dispose();
                }
            );
        }

    }

    function winner() {
        $('.counter').text('Winner');
       // $('.winner').append('<h1 class="winner-show">Winner!</h1>');
        var disposableStrictGame = Rx.Scheduler.default.scheduleFuture(
            'one',
            2000,
            function (scheduler, x) {
                $('.winner-show').detach();
                startGame();
                disposableStrictGame.dispose();
            }
        );
    }




        function begin(args) {
            if (vm.restart) {
                endgame();
            }
            if ((arguments.length === 2) && (arguments[0] = 'start')) {
                round = 1;
                $('.counter').text(round);
                var outSource = vm.obsSeq.take(round).toArray();
                outSource.subscribe(
                    function (x) {
                        rxjsShow(x);
                    })
            }
            if (arguments.length === 0) {
                var playerSource = vm.obsSeq.take(round).toArray();
                playerSource.subscribe(
                    function (x) {
                        playerTurn(x, 0);
                    });

            } else if (arguments[0] === 'next') {
                ++round;
                $('.counter').text(round);
                outSource = vm.obsSeq.take(round).toArray();
                outSource.subscribe(
                    function (x) {
                        rxjsShow(x);
                    })
            } else if (arguments[0] === 'retry') {
                oneOn();
                twoOn();
                threeOn();
                fourOn();
                setTimeout(flash, 100);
                if (!vm.retry) {
                    vm.retry = !vm.retry;
                    outSource = vm.obsSeq.take(round).toArray();
                    outSource.subscribe(
                        function (x) {
                            rxjsShow(x);
                        })
                } else {
                    endgame();
                }

            }

        }

        function flash(){
            oneOn();
            twoOn();
            threeOn();
            fourOn();
        }


        function playerTurn(playerSeq) {
            var playerChoice;
            var correctSelection;
            var patternArray;
            playerChoice = arguments[1];

            patternArray = arguments[0];
            correctSelection = arguments[0][playerChoice];
            //console.log(patternArray); // todo remove debug item
            if (playerChoice === arguments[0].length) {
                if (playerChoice === 11) {
                    winner();
                } else if(vm.restart){
                    endgame();
                } else {
                    begin('next');
                }

            } else {

                var oneClick = Rx.Observable.fromEvent(canClick, 'click');

                var oneSub = oneClick.subscribe(
                    function (x) {
                        switch (x.currentTarget.id) {
                            case '1':
                                audio1.play();
                                oneOn();
                                var disposableOne = Rx.Scheduler.default.scheduleFuture(
                                    'one',
                                    250,
                                    function (scheduler, x) {
                                        oneOn();
                                        disposableOne.dispose();
                                    }
                                );
                                if (correctSelection === 1) {
                                    oneSub.dispose();
                                    return playerTurn(patternArray, ++playerChoice)
                                } else {
                                    oneSub.dispose();
                                    begin('retry');
                                }
                                break;
                            case '2':
                                audio2.play();
                                twoOn();
                                var disposableTwo = Rx.Scheduler.default.scheduleFuture(
                                    'one',
                                    250,
                                    function (scheduler, x) {
                                        twoOn();
                                        disposableTwo.dispose();
                                    }
                                );
                                if (correctSelection === 2) {
                                    oneSub.dispose();
                                    return playerTurn(patternArray, ++playerChoice)
                                } else {
                                    oneSub.dispose();
                                    begin('retry');
                                }
                                break;
                            case '3':
                                audio3.play();
                                threeOn();
                                var disposableThree = Rx.Scheduler.default.scheduleFuture(
                                    'one',
                                    250,
                                    function (scheduler, x) {
                                        threeOn();
                                        disposableThree.dispose();
                                    }
                                );
                                if (correctSelection === 3) {
                                    oneSub.dispose();
                                    return playerTurn(patternArray, ++playerChoice)
                                } else {
                                    oneSub.dispose();
                                    begin('retry');
                                }
                                break;
                            case '4':
                                audio4.play();
                                fourOn();
                                var disposablefour = Rx.Scheduler.default.scheduleFuture(
                                    'one',
                                    250,
                                    function (scheduler, x) {
                                        fourOn();
                                        disposablefour.dispose();
                                    }
                                );
                                if (correctSelection === 4) {
                                    oneSub.dispose();
                                    return playerTurn(patternArray, ++playerChoice)
                                } else {
                                    oneSub.dispose();
                                    begin('retry');
                                }
                                break;
                            default:
                                oneSub.dispose();
                                endgame();
                                if(vm.restart){
                                    endgame();
                                }
                                break;
                        }

                    }
                );
            }

        }


        function rxjsShow(showSeq) {
            var subject = new Rx.Subject();
            var disposable = Rx.Scheduler.default.schedulePeriodic(
                0,
                1000,
                function (m) {
                    subject.onNext(showSeq[m]);
                    var end = showSeq.length - 1;
                    if (++m > end) {
                        disposable.dispose();
                        begin();
                    }
                    if(vm.restart){
                        disposable.dispose();
                        endgame();
                    }
                    return m;
                });

            var subscription = subject.subscribe(
                function (x) {
                    switch (x) {
                        case 1:
                            audio1.play();
                            oneOn();
                            setTimeout(oneOn, 500);
                            break;
                        case 2:
                            audio2.play();
                            twoOn();
                            setTimeout(twoOn, 500);
                            break;
                        case 3:
                            audio3.play();
                            threeOn();
                            setTimeout(threeOn, 500);
                            break;
                        case 4:
                            audio4.play();
                            fourOn();
                            setTimeout(fourOn, 500);
                            break;
                        default:
                            disposable.dispose();
                            break;
                    }
                });
        }


});