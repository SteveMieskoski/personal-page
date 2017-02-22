
run(); //have an on off button? & or a time off?


function run() {
    let button = $('.aBtn');
    var vm = this;
    vm.state = {current: '', waiting: '', operation: null, prior: null , priorOperation: null, priorInput: null};
    vm.inputs = '';
    var screen = $('#screen');

    let running = {
        add: function (a, b) {
            console.log('add', a + b);
            return a + b;
        },

        sub: function (a, b) {
            console.log('sub', a - b);
            return a - b;
        },

        multi: function (a, b) {
            console.log('multi', a * b);
            return a * b;
        },
        div: function (a, b) {
            if(b !== 0){
                return a / b;
            } else {
                return a;
            }

        }
    };

    button.click(function(){

        let btnValue = this.textContent;
        if(Number.parseInt(btnValue)){
            vm.state.current = vm.state.current + btnValue;
            screen.text(vm.state.current);
        } else if(btnValue == '0'){
            vm.state.current = vm.state.current + '0';
            screen.text(vm.state.current);
        } else {
            switch(this.id){
                case 'clear':
                    vm.state = {current: '', waiting: '', operation: null, prior: null , priorOperation: null, priorInput: null};
                    screen.text('');
                    break;
                case 'add':
                    if(!vm.state.operation){
                        vm.state.operation = 'add';
                        if(!vm.state.prior){
                            vm.state.waiting = Number.parseInt(vm.state.current);
                            vm.state.current = '';
                        } else {
                            vm.state.waiting = vm.state.prior;
                            vm.state.current = '';
                        }
                        console.log(screen);
                        screen.text('+');
                    } else if (vm.state.operation ){
                        vm.state.waiting = running[vm.state.operation](vm.state.waiting, Number.parseInt(vm.state.current));
                        vm.state.operation = 'add';
                        vm.state.current = '';
                        console.log(vm.state);
                        screen.text(vm.state.waiting);
                    }
                    //vm.state.waiting = Number.parseInt(vm.inputs);

                    break;
                case 'sub':
                    if(!vm.state.operation){
                        vm.state.operation = 'sub';
                        if(!vm.state.prior){
                            vm.state.waiting = Number.parseInt(vm.state.current);
                            vm.state.current = '';
                        } else {
                            vm.state.waiting = vm.state.prior;
                            vm.state.current = '';
                        }
                        screen.text('-');
                        console.log(vm.state);
                    } else if (vm.state.operation ){
                        vm.state.waiting = running[vm.state.operation](vm.state.waiting, Number.parseInt(vm.state.current));
                        vm.state.operation = 'sub';
                        vm.state.current = '';
                        console.log(vm.state);
                        screen.text(vm.state.waiting);
                    }

                    break;
                case 'div':
                    if(!vm.state.operation || vm.state.prior){
                        vm.state.operation = 'div';
                        if(!vm.state.prior){
                            vm.state.waiting = Number.parseInt(vm.state.current);
                            vm.state.current = '';
                        } else {
                            vm.state.waiting = vm.state.prior;
                            vm.state.current = '';
                        }
                        screen.text('/');
                        console.log(vm.state);
                    } else if (vm.state.operation ){
                        vm.state.waiting = running[vm.state.operation](vm.state.waiting, Number.parseInt(vm.state.current));
                        vm.state.operation = 'div';
                        vm.state.current = '';
                        console.log(vm.state);
                        screen.text(vm.state.waiting);
                    }
                    break;
                case 'mult':
                    if(!vm.state.operation || vm.state.prior){
                        vm.state.operation = 'multi';
                        if(!vm.state.prior){
                            vm.state.waiting = Number.parseInt(vm.state.current);
                            vm.state.current = '';
                        } else {
                            vm.state.waiting = vm.state.prior;
                            vm.state.current = '';
                        }
                        screen.text('x');
                        console.log(vm.state);
                    } else if (vm.state.operation ){
                        vm.state.waiting = running[vm.state.operation](vm.state.waiting, Number.parseInt(vm.state.current));
                        vm.state.operation = 'multi';
                        vm.state.current = '';
                        console.log(vm.state);
                        screen.text(vm.state.waiting);
                    }
                    break;
                case 'enter':
                    if(!vm.state.operation){
                        if(vm.state.priorOperation){
                            vm.state.prior = running[vm.state.priorOperation](vm.state.prior, vm.state.priorInput);
                            screen.text(vm.state.prior);
                        } else {
                            vm.state.operation = null;
                            vm.state.prior = Number.parseInt(vm.state.current);
                            vm.state.current = '';
                            screen.text(vm.state.prior);
                        }
                        console.log(vm.state);
                    } else if (vm.state.operation){
                        vm.state.prior = running[vm.state.operation](vm.state.waiting, Number.parseInt(vm.state.current));
                        screen.text(vm.state.prior);
                        vm.state.priorInput = Number.parseInt(vm.state.current);
                        vm.state.priorOperation = vm.state.operation;
                        vm.state.operation = null;
                        vm.state.current = '';
                        vm.state.waiting = '';
                        console.log(vm.state);
                    }
                    break;
            }
        }

    });


}


