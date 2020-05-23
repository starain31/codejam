const readlineInterface = require('readline').createInterface({
    input: process.stdin
});

const input = [];
readlineInterface.on('line', function (line) {
    input.push(line);
});

readlineInterface.on('close', function () {
    main({input});
});

function take_input({input}) {
    const N = parseInt(input.shift());
    const M = Array.from({length: N}, function () {
        return input.shift().split(' ').map(v => parseInt(v));
    });
    return {N, M};
}

function main({input}) {
    const T = parseInt(input.shift());
    for (let C = 1; C <= T; C += 1) {
        console.log(`Case #${C + 1}: ${solve(take_input({input})).join(' ')}`)
    }
}


function trace({M, N}) {
    return M[N][N] + (0 < N ? trace({M, N: N - 1}) : 0)
}

function has_not_repeated({row}) {
    return row.every(function (val, index) {
        return row.indexOf(val) === index;
    });
}

function repeated_row({M}) {
    return M.reduce(function (count, row) {
        return count + (has_not_repeated({row}) ? 0 : 1);
    }, 0);
}

function repeated_column({M, N}) {
    let count = 0;
    for (let column = 0; column < N; ++column) {
        const seen = new Map();
        for (let row = 0; row < N; ++row) {
            if (seen.get(M[row][column])) {
                count += 1;
                break;
            }
            seen.set(M[row][column], true)
        }
    }
    return count;
}

function solve({N, M}) {
    return [trace({M, N: N - 1}), repeated_row({M, N}), repeated_column({M, N})];
}
