const WHITESPACE_REGEX = / /g;
const NEWLINE_CHARACTER = '\n';
const ACTIVE_BRANCH_SYMBOL = '*';
const RESERVED_BRANCH_NAMES = ['master', 'develop', 'test', 'staging'];

/**
 * Returns true when
 * - the branchName is non-blank
 * - is not currently checked out
 * - is not a reserved branchname
 *
 * @param {string} branchName
 */
function _isRemovableBranch(branchName) {
    return branchName !== '' &&
        branchName.indexOf(ACTIVE_BRANCH_SYMBOL) === -1 &&
        RESERVED_BRANCH_NAMES.indexOf(branchName) === -1;
}

function extractBranchList(str) {
    const branchList = str.split(NEWLINE_CHARACTER)
        .reduce((sum, branch) => {
            const trimmedBranchName = branch.replace(WHITESPACE_REGEX, '');

            if (_isRemovableBranch(trimmedBranchName)) {
                sum.push(trimmedBranchName);
            }

            return sum;
        }, []);

    return branchList;
};

module.exports = extractBranchList;
