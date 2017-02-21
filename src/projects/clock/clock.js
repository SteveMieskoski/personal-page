$(document).ready(function () {


    var keepTime;
    var resumed;

    $('.start').click(function () {
        start();
    });

    setTime();
    setBreak();

    function setTime() {

        $('.up').on('click', function () {
            var upMin = Number.parseInt($('.set-min').text());
            var newMin = upMin + 1;
            if (newMin < 10) {
                newMin = '0' + newMin.toString();
            } else {
                newMin = newMin.toString();
            }
            $('.set-min').text(newMin.toString());
        })

        $('.down').click(function () {
            var downMin = Number.parseInt($('.set-min').text());
            var newMin = downMin - 1;
            if (newMin < 0) {
                newMin = '00';
            } else if (newMin < 10) {
                newMin = '0' + newMin.toString();
            } else {
                newMin = newMin.toString();
            }
            $('.set-min').text(newMin);
        })

    }

    function setBreak() {

        $('.break-up').on('click', function () {
            var upMinBreak = Number.parseInt($('.set-break-min').text());
            var newMinBreak = upMinBreak + 1;
            if (newMinBreak < 10) {
                newMinBreak = '0' + newMinBreak.toString();
            } else {
                newMinBreak = newMinBreak.toString();
            }
            $('.set-break-min').text(newMinBreak);
        })

        $('.break-down').click(function () {
            var downMinBreak = Number.parseInt($('.set-break-min').text());
            var newMinBreak = downMinBreak - 1;
            if (newMinBreak < 1) {
                newMinBreak = '00';
            } else if (newMinBreak < 10) {
                newMinBreak = '0' + newMinBreak.toString();
            } else {
                newMinBreak = newMinBreak.toString();
            }
            $('.set-break-min').text(newMinBreak);
        })

    }


    function start() {
        var rawMinutes = Number.parseInt($('.set-min').text());
        var totalT = rawMinutes * 60;

        timer(totalT, true);
    }

    function breakTime() {
        var rawMinutes = Number.parseInt($('.set-break-min').text());
        var totalB = rawMinutes * 60;
        timer(totalB, false);
    }


    function timer(beginningTime) {
        if (arguments.length === 2) {
            var doBreak = arguments[1];
        } else {
            doBreak = true;
        }

        var pausableSource$ = function (inTime) {
            return Rx.Observable.generateWithRelativeTime(
                inTime,
                function (x) {
                    return x > -1;
                },
                function (x) {
                    return --x;
                },
                function (x) {
                    return x;
                },
                function (x) {
                    return 1000;
                }
            ).doOnCompleted(
                function () {
                    console.log('Do Completed');
                    var audio = new Audio('./Air Horn-SoundBible.com-1561808001.mp3');
                    audio.play();
                    if (doBreak) {
                        watcherDispose.dispose();
                        replayDispose.dispose();
                        breakTime();
                    } else {
                        watcherDispose.dispose();
                        replayDispose.dispose();
                        start();
                    }
                }
            );
        };

        var replaySource$ = new Rx.ReplaySubject(1);
        keepTime = {current: beginningTime};


        var replayDispose = replaySource$.subscribe(
            function (y) {
                keepTime = {current: y};
            }
        );

        var canPause = pausableSource$(keepTime.current - 1).pausable();

        canPause.resume();

        var watcher$ =
            canPause.do(
                function (x) {
                    showTime(x);
                }
            );

        var watcherDispose = watcher$.subscribe(replaySource$);

        // Reset Timer
        $('.reset').click(function () {
            watcherDispose.dispose();
            replayDispose.dispose();
            var originalTime = Number.parseInt($('.set-min').text());
            $('.show-min').text(originalTime.toString());
            $('.show-sec').text('00');
        });

        // Pause
        $('.pause').click(function () {
            canPause.pause();
        });


        // Resume after Pause
        $('.resume').click(function () {
            resumed = true;
            var canPause = pausableSource$(keepTime.current - 1).pausable();
            canPause.resume();

            var watcher$ = canPause.do(
                function (x) {
                    showTime(x);
                }
            );
            watcherDispose = watcher$.subscribe(replaySource$);
        });

    }


    function showTime(t) {
        var intCalcMin1 = t % 3600;
        var intCalcMin2 = intCalcMin1 / 60;
        var calcPartialMin = intCalcMin2 % 1;
        var remainingMin = intCalcMin2 - calcPartialMin;
        var remainingSec = t % 60;
        if (remainingMin < 10) {
            $('.show-min').text('0' + remainingMin.toString());
        } else {
            $('.show-min').text(remainingMin);
        }
        if (remainingSec < 10) {
            $('.show-sec').text('0' + remainingSec.toString());
        } else {
            $('.show-sec').text(remainingSec);

        }
    }


});