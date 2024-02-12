const { exec } = require('child_process');
const { prompt } = require('inquirer');
const util = require("util");
const execProm = util.promisify(exec);
const chalk = require('chalk');
const branches = require('@n8rzz/branches');

async function getBranches(repo = 'n8rzz/gbrdm') {
    try {
        const { stdout } = await execProm(`gh api repos/${repo}/branches`);
        const branches = JSON.parse(stdout);

        return branches
    } catch (error) {
        console.error(error);
    }
}

function _buildBranchListWithRemoteAnnotations(branchList, remoteBranchList) {
    const transformedBranchList = branchList.reduce((sum, branchName) => {
        const foundRemoteBranch = remoteBranchList.filter((branch) => branch.name === branchName)[0];

        if (!foundRemoteBranch) {
            return [
                ...sum,
                ` ${chalk.yellow('●')} ${branchName}`
            ];
        }

        return [
            ...sum,
            ` ${chalk.green('●')} ${branchName}`
        ];
    }, []);

    return transformedBranchList;
}

function _buildCheckboxList(branchList, remoteBranchList) {
    const branchListWithRemoteAnnotations = _buildBranchListWithRemoteAnnotations(branchList, remoteBranchList);
    const questions = [
        {
            name: 'branchesToDelete',
            type: 'checkbox',
            message: 'Select branches to delete',
            choices: branchListWithRemoteAnnotations
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
            console.log(chalk.red('Aborting delete. Whew! No branches were deleted'));

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


(async function () {
    const remoteBranchList = await getBranches();
    
    return branches().then((branchList) => _buildCheckboxList(branchList, remoteBranchList));
})();
