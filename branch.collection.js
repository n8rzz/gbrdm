const chalk = require('chalk');
const BranchModel = require("./branch.model");

class BranchCollection {
    get deletableItemsForDisplay() {
        return this._itemsToRemove.map((item) => item.name).join(', ');
    }

    get itemsForDisplay() {
        return this._items.map((model) => model.display)
    }

    constructor(branchList, remoteBranchList) {
        this._init(branchList, remoteBranchList);
        this._itemsToRemove = [];
    }

    registerItemsToDelete(branchesToDelete) {
        this._itemsToRemove = branchesToDelete.map((branchName) => {
            return this._findByDisplay(branchName);
        });
    }

    _init(branchList, remoteBranchList) {
        this._items = branchList.reduce((sum, branchName) => {
            const foundRemoteBranch = remoteBranchList.filter((branch) => branch.name === branchName)[0];
            const display = !foundRemoteBranch ? ` ${chalk.yellow('●')} ${branchName}` : ` ${chalk.green('●')} ${branchName}`
            const model = new BranchModel(branchName, display, foundRemoteBranch);

            return [
                ...sum, 
                model
            ];
        }, []);
    }

    _findByDisplay(displayName) {
        return this._items.find((item) => item.display === displayName);
    }
}

module.exports = BranchCollection;