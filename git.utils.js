const { exec } = require('child_process');
const util = require('util');
const gitUrlParse = require('git-url-parse');
const url = require('url');

const execProm = util.promisify(exec);

function extractGitUrlFromRemote(remote) {
  const pushPullRemote = remote.trim().split('\n')[0];
  const origin = pushPullRemote.split('\t')[1].split('(fetch)')[0];
  const repository = gitUrlParse(origin.trim())

  return {
    name: repository.name,
    owner: repository.owner
  }
}

async function extractOwnerAndRepositoryFromRepo() {
    const { stdout: remote }  = await execProm(`git remote -v`);  
    
    return extractGitUrlFromRemote(remote);
}

module.exports = { 
  extractGitUrlFromRemote,
  extractOwnerAndRepositoryFromRepo 
};