const { extractGitUrlFromRemote } = require('./git.utils.js');

describe('.extractGitUrlFromRemote()', () => {
    test('should extract the git url from `git remote -v` output', () => {
       const gitRemoteOutputMock = `origin\tgit@github.com:n8rzz/gbrdm.git (fetch)\norigin\tgit@github.com:n8rzz/gbrdm.git (push)`;
        const result = extractGitUrlFromRemote(gitRemoteOutputMock);
        const expectedResult = { owner: 'n8rzz', name: 'gbrdm' };

        expect(result).toEqual(expectedResult);
    });
});