const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const util = require("util");
const argv = require('minimist')(process.argv.slice(2));
const branches = require('@n8rzz/branches');
const BranchCollection = require('./branch.collection.js');
const execProm = util.promisify(exec);

async function _getRemoteBranches(repo = 'n8rzz/gbrdm') {
    try {
        const { stdout } = await execProm(`gh api repos/${repo}/branches`);
        const branches = JSON.parse(stdout);

        return branches
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {BranchModel[]} branchList 
 * @param {*} remoteBranchList 
 */
function _buildInitialView(branchList, remoteBranchList, isUsingRemote) {
    const branchCollection = new BranchCollection(branchList, remoteBranchList, { isUsingRemote });
    const questions = [
        {
            name: 'branchesToDelete',
            type: 'checkbox',
            message: 'Select branches to delete',
            choices: branchCollection.itemsForDisplay,
        }
    ];

    prompt(questions)
        .then((answers) => {
            branchCollection.registerItemsToDelete(answers.branchesToDelete);
            _confirmBranchesToDelete(branchCollection);
        });
}

function _confirmBranchesToDelete(branchCollection) {
    prompt({
        name: 'confirm',
        type: 'confirm',
        message: `Are you sure you want to delete these branches: ${branchCollection.itemsToDelete}?`
    }).then((answers) => {
        if (!answers.confirm) {
            console.log(chalk.red('Aborting delete. Whew! No branches were deleted'));

            return;
        }

        _deleteBranchList(branchCollection.itemsToDelete);
    });
}

function _deleteBranchList(branchList) {
    console.log('### _deleteBranchList', branchList);
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
    const remoteBranchList = await _getRemoteBranches();
    
    return branches().then((branchList) => _buildInitialView(branchList, remoteBranchList, argv['-r']));
})();
