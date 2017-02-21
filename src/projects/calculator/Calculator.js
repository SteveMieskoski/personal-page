var one = $('.one');
var two = $('.two');
var three = $('.three');
var four = $('.four');
var five = $('.five');
var six = $('.six');
var seven = $('.seven');
var eight = $('.eight');
var nine = $('.nine');
var zero = $('.zero');
var numHtml = $('.num');
var enter = $('.enter');
var add = $('.add');
var clear = $('.clear');
var sub = $('.sub');
var mult = $('.mult');
var div = $('.div');

var inputs = [];
var result = Number.NaN;
var intResult = Number.NaN;
var vm = this;
var afterEnter = false;
var lastOperation;
var priorText;

vm.Subtraction = Subtraction;
vm.Addition = Addition;
vm.Multiplication = Multiplication;
vm.Division = Division;


enter.click(function () {
    var num = combineInput();
  //  inputs = [];


    if (afterEnter) {

        if (Number.isFinite(vm.intResult)){
            LastOperatorCalled(lastOperation, num);
        } else {
            vm.intResult = vm.intResult(num);
        }
        displayCurrentEntry(vm.intResult);
        afterEnter = false;
        //console.log('Enter 0:', vm.intResult);

    } else if (Number.isNaN(vm.intResult)) {
        //console.log('Enter 1:', vm.intResult);

    } else if (typeof vm.intResult === 'function') {
        vm.intResult = vm.intResult(num);
        displayCurrentEntry(vm.intResult);
        //console.log('Enter 2:', vm.intResult);

    } else if (Number.isFinite(vm.intResult)) {
        //console.log('Pre Enter 3:', vm.intResult);
        LastOperatorCalled(lastOperation, num);
      //  vm.intResult = vm.intResult(num);
        //  vm.intResult = Addition(num, vm.intResult);
        displayCurrentEntry(vm.intResult);
        //console.log('(muted) Enter 3:', vm.intResult);

    } else {
        //console.log('Enter 4:', vm.intResult);
    }
    afterEnter = true;
    $('.num').text(vm.intResult);
});


add.click(function () {
    var num = combineInput();
    inputs = [];
    lastOperation = 'add';


    if (afterEnter) {
        vm.intResult = Addition(vm.intResult);
        displayCurrentEntry(vm.intResult);
        afterEnter = false;
        //console.log('Addition 0:', vm.intResult);

    } else if (Number.isNaN(vm.intResult)) {
        vm.intResult = Addition(num);
        //console.log('Addition 1:', vm.intResult);

    } else if (typeof vm.intResult === 'function') {
        vm.intResult = vm.intResult(num);
        displayCurrentEntry(vm.intResult);
        //console.log('Addition 2:', vm.intResult);

    } else if (Number.isFinite(vm.intResult)) {
        vm.intResult = Addition(num, vm.intResult);
        displayCurrentEntry(vm.intResult);
        //console.log('Addition 3:', vm.intResult);

    } else {
        //console.log('Addition 4:', vm.intResult);
    }

    afterEnter = false;
   // $('.mem-prior').remove();
    priorText = numHtml.text();
    numHtml.text(priorText + '+');
    // $('.afterEntered').append('<h3 class="mem-prior">' + num + '</h3>');

});


sub.click(function () {
    var num = combineInput();
    inputs = [];
    lastOperation = 'sub';

    if (afterEnter) {
        vm.intResult = Subtraction(vm.intResult);
        displayCurrentEntry(vm.intResult);
        afterEnter = false;


    } else if (Number.isNaN(vm.intResult)) {
        vm.intResult = Subtraction(num);

    } else if (typeof vm.intResult === 'function') {
        vm.intResult = vm.intResult(num);
        displayCurrentEntry(vm.intResult);

    } else if (Number.isFinite(vm.intResult)) {
        vm.intResult = Subtraction(vm.intResult, num);
        displayCurrentEntry(vm.intResult);

    } else {
    }
    afterEnter = false;
    priorText = numHtml.text();
    numHtml.text(priorText + '-');
});

mult.click(function () {
    var num = combineInput();
    inputs = [];
    lastOperation = 'mult';

    if (afterEnter) {
        vm.intResult = Multiplication(vm.intResult);
        displayCurrentEntry(vm.intResult);
        afterEnter = false;

    } else if (Number.isNaN(vm.intResult)) {
        vm.intResult = Multiplication(num);

    } else if (typeof vm.intResult === 'function') {
        vm.intResult = vm.intResult(num);
        displayCurrentEntry(vm.intResult);

    } else if (Number.isFinite(vm.intResult)) {
        vm.intResult = Multiplication(vm.intResult, num);
        displayCurrentEntry(vm.intResult);

    } else {
    }
    priorText = numHtml.text();
    numHtml.text(priorText + '*');


});


div.click(function () {
    var num = combineInput();
    inputs = [];
    lastOperation = 'div';

    if (afterEnter) {
        vm.intResult = Division(vm.intResult);
        displayCurrentEntry(vm.intResult);
        afterEnter = false;

    } else if (Number.isNaN(vm.intResult)) {
        vm.intResult = Division(num);

    } else if (typeof vm.intResult === 'function') {
        vm.intResult = vm.intResult(num);
        displayCurrentEntry(vm.intResult);

    } else if (Number.isFinite(vm.intResult)) {
        vm.intResult = Division(vm.intResult, num);
        displayCurrentEntry(vm.intResult);

    } else {
    }


    priorText = numHtml.text();
    numHtml.text(priorText + '/');

});


function combineInput() {
    var numStr = inputs.join('');
    return Number.parseInt(numStr);
}

function displayCurrentEntry(data) {
}

function LastOperatorCalled(lastOperation, num){
    switch (lastOperation) {
        case 'add':
            vm.intResult = Addition(vm.intResult, num);
            break;
        case 'sub':
            vm.intResult = Subtraction(vm.intResult, num);
            break;
        case 'mult':
            vm.intResult = Multiplication(vm.intResult, num);
            break;
        case 'div':
            vm.intResult = Division(num, vm.intResult);
            break;
        default:
            console.error('Error In Enter Operation Chaining');
            break;
    }
    return vm.intResult;
}

function Addition(a, b) {
    if (arguments.length === 2) {
        return a + b;

    } else if (arguments.length === 1) {

        var priorArg = arguments[0];

        var newFunc = function (a) {
            var result = a + priorArg;
            return result;
        };
        return newFunc;

    } else if (arguments.length === 0) {
        var newFunc = function (a, b) {
            var result = a + b;
            return result;
        };
        return newFunc;
    }

};


function Subtraction(a, b) {
    if (arguments.length === 2) {
        return a - b;

    } else if (arguments.length === 1) {
        var priorArg = arguments[0];
        var newFunc = function (a) {
            var result = priorArg - a;
            return result;
        };
        return newFunc;
    } else if (arguments.length === 0) {
        var newFunc = function (a, b) {
            var result = a - b;
            return result;
        };
        return newFunc;
    }
};


function Multiplication(a, b) {
    if (arguments.length === 2) {
        return a * b;

    } else if (arguments.length === 1) {
        var priorArg = arguments[0];
        return function (a) {
            return a * priorArg;
        };
    } else if (arguments.length === 0) {
        var newFunc = function (a, b) {
            var result = a * b;
            return result;
        };
        return newFunc;
    }
};


function Division(a, b) {
    if (arguments.length === 2) {
        var aa = a !== 0 ? a : 1;
        return b / aa;
    } else if (arguments.length === 1) {
        var priorArg = arguments[0];
        return function Div(a) {
            return priorArg / a;
        };
    } else if (arguments.length === 0) {
        var newFunc = function (a, b) {
            var bb = b !== 0 ? b : 1;
            var result = a / bb;
            return result;
        };
        return newFunc;
    }
};



clear.click(function () {
    intResult = Number.NaN;
    afterEnter = false;
    inputs = [];
    $('.mem-prior').remove();
    numHtml.text('');
});
one.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '1');
    inputs.push(1);
});
two.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '2');
    inputs.push(2);
});
three.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '3');
    inputs.push(3);
});
four.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '4');
    inputs.push(4);
});
five.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '5');
    inputs.push(5);
});
six.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '6');
    inputs.push(6);
});
seven.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '7');
    inputs.push(7);

});
eight.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '8');
    inputs.push(8);

});
nine.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '9');
    inputs.push(9);

});
zero.click(function () {
    priorText = numHtml.text();
    numHtml.text(priorText + '0');
    inputs.push(0);

});