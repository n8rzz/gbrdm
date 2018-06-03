const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const branches = require('@n8rzz/branches');

function _buildCheckboxList(branchList) {
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
            _confirmBranchesToDelete(answers.branchesToDelete);
        });
}

function _confirmBranchesToDelete(branchList) {
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
            _deleteSingleBranch(branchName);
        } catch (error) {
            throw error;
        }
    }
}

function _deleteSingleBranch(branchName) {
    exec(`git branch -D ${branchName}`, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        console.log(chalk.yellow(`Deleted branch: ${branchName}`));
    });
}


(function () {
    return branches().then((branchList) => _buildCheckboxList(branchList));
})();
