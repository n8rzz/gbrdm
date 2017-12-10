const { exec } = require('child_process');
const chalk = require('chalk');

const WHITESPACE_REGEX = / /g;
const NEWLINE_CHARACTER = '\n';

function _extractBranchListFromStr(str) {
    const branchList = str.split(NEWLINE_CHARACTER);
    const trimmedBranchList = branchList.reduce((sum, branch) => {
        if (branch !== '') {
            sum.push(branch.replace(WHITESPACE_REGEX, ''));
        }

        return sum;
    }, []);

    return trimmedBranchList;
};

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    const branchList = _extractBranchListFromStr(stdout);
    console.log('+++', branchList);
});

