const { exec } = require('child_process');
const chalk = require('chalk');
const extractBranchList = require('./lib/extractBranchList');

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    const branchList = extractBranchList(stdout);
    console.log('+++', branchList);
});

