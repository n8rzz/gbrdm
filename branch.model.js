class BranchModel {
    get display() {
        return this._display;
    }
    
    get name() {
        return this._name;
    }

    constructor(name, display, branch) {
        if (!name) {
            throw new Error('Missing branch name');
        }

        this._branch = branch;
        this._name = name;
        this._display = display;
    }
}

module.exports = BranchModel;