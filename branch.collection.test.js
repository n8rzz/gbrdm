const BranchCollection = require('./branch.collection.js');

describe('BranchCollection', () => {
    const branchListMock = ['foo'];
    const remoteBranchListMock = [{
        name: 'foo',
        commit: {
          sha: '',
          url: ''
        },
        protected: false
      }]
    
    describe('when called with invalid params', () => {
        describe('when called without params', () => {
            test('should throw', () => {
                expect(() => new BranchCollection()).toThrow();
            });
        });
    });
    
    describe('when called with valid params', () => {
        test('should not throw', () => {
            expect(() => new BranchCollection(branchListMock, remoteBranchListMock)).not.toThrow();
        });
    });
});