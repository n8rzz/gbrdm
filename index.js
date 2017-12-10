const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const extractBranchList = require('./lib/extractBranchList');

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    extractBranchNames(stdout);
});

function extractBranchNames(stdout) {
    const branchList = extractBranchList(stdout);

    if (branchList.length === 0) {
        console.log(chalk.red('No non-reserved branches were found to remove.'));

        return;
    }

    createCheckboxListForBranchList(branchList);
}

function createCheckboxListForBranchList(branchList) {
    const questions = [
        {
            name: 'branchesToDelete',
            type: 'checkbox',
            message: 'Select branches to delete',
            choices: branchList
        }
    ];

    prompt(questions)
        .then((answers) => {
            confirmBranchesToDelete(answers.branchesToDelete);
        });
}

function confirmBranchesToDelete(branchList) {
    prompt({
        name: 'confirm',
        type: 'confirm',
        message: `Are you sure you want to delete these branches: ${branchList.join(', ')}?`
    }).then((answers) => {
        if (!answers.confirm) {
            console.log(chalk.red('Aborting delete.  Whew!'));

            return;
        }

        _deleteBranchList(branchList);
    });
}

function _deleteBranchList(branchList) {
    for (let i = 0; i < branchList.length; i++) {
        const branchName = branchList[i];

        try {
            _deleteGitBranch(branchName);
        } catch (error) {
            throw error;
        }
    }
}

function _deleteGitBranch(branchName) {
    exec(`git branch -D ${branchName}`, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        console.log(chalk.yellow(`Deleted branch: ${branchName}`));
    });
}
