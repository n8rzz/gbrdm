const chalk = require('chalk');
const BranchModel = require("./branch.model");

class BranchCollection {
    get itemsForDisplay() {
        return this._items.map((model) => model.display)
    }

    constructor(branchList, remoteBranchList) {
        this._init(branchList, remoteBranchList);
    }

    _init(branchList, remoteBranchList) {
        this._items = branchList.reduce((sum, branchName) => {
            
            const foundRemoteBranch = remoteBranchList.filter((branch) => branch.name === branchName)[0];
            const display = !foundRemoteBranch ? ` ${chalk.yellow('●')} ${branchName}` : ` ${chalk.green('●')} ${branchName}`
            const model = new BranchModel(branchName, display, foundRemoteBranch);

            return model;
        }, []);
    }
}

module.exports = BranchCollection;