const BranchCollection = require('./branch.collection.js');

describe('BranchCollection', () => {
    const branchListMock = ['foo', 'bar'];
    const remoteBranchListMock = [
        {
        name: 'foo',
        commit: {
          sha: '',
          url: ''
        },
        protected: false
      },
      {
        name: 'bar',
        commit: {
          sha: '',
          url: ''
        },
        protected: false
      }
    ]
    
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

    describe('.registerItemsToDelete', () => {
        describe('when passed a single branche', () => {
            test('Should return a single string', () => {
                const collection = new BranchCollection(branchListMock, remoteBranchListMock);
                const branchesToRemove = [' \x1B[32m●\x1B[39m foo']
                const expectedResult = 'foo';
                
                collection.registerItemsToDelete(branchesToRemove);

                expect(collection.deletableItemsForDisplay).toEqual(expectedResult);
            });
        });
        
        describe('when passed multiple branches', () => {
            test('Should return a comma separated string', () => {
                const collection = new BranchCollection(branchListMock, remoteBranchListMock);
                const branchesToRemove = [' \x1B[32m●\x1B[39m foo', ' \x1B[32m●\x1B[39m bar']
                const expectedResult = 'foo, bar';
                
                collection.registerItemsToDelete(branchesToRemove);

                expect(collection.deletableItemsForDisplay).toEqual(expectedResult);
            });
        });
    });
});