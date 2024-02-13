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
    ];
    const configMock = { isUsingRemote: true };
    
    describe('when called with invalid params', () => {
        describe('when called without params', () => {
            test('should throw', () => {
                expect(() => new BranchCollection()).toThrow();
            });
        });
    });
    
    describe('when called with valid params', () => {
        test('should not throw', () => {
            expect(() => new BranchCollection(branchListMock, remoteBranchListMock, configMock)).not.toThrow();
        });
    });

    describe('.registerItemsToDelete()', () => {
        describe('when passed a single branch', () => {
            test('Should return a single string', () => {
                const collection = new BranchCollection(branchListMock, remoteBranchListMock, configMock);
                const branchesToRemove = [' \x1B[32m●\x1B[39m foo']
                const expectedResult = 'foo';
                
                collection.registerItemsToDelete(branchesToRemove);

                expect(collection.deletableItemsForDisplay).toEqual(expectedResult);
            });
        });
        
        describe('when passed multiple branches', () => {
            test('Should return a comma separated string', () => {
                const collection = new BranchCollection(branchListMock, remoteBranchListMock, configMock);
                const branchesToRemove = [' \x1B[32m●\x1B[39m foo', ' \x1B[32m●\x1B[39m bar']
                const expectedResult = 'foo, bar';
                
                collection.registerItemsToDelete(branchesToRemove);

                expect(collection.deletableItemsForDisplay).toEqual(expectedResult);
            });
        });
    });

    describe('#itemsToDelte', () => {   
        test('Should return an array of branch names', () => {
            const collection = new BranchCollection(branchListMock, remoteBranchListMock, configMock);
            const branchesToRemove = [' \x1B[32m●\x1B[39m foo', ' \x1B[32m●\x1B[39m bar']
            const expectedResult = ['foo', 'bar'];
            
            collection.registerItemsToDelete(branchesToRemove);

            expect(collection.itemsToDelete).toEqual(expectedResult);
        });
    });

    describe('config', () => {
        describe('#isUsingRemote', () => {
            describe('and it is passed as false', () => {
                test('Each models #display should equal #name', () => {
                    const collection = new BranchCollection(branchListMock, remoteBranchListMock, { isUsingRemote: false });
                    const modelNames = collection['_items'].map((item) => item.name);
                    const modelDisplays = collection['_items'].map((item) => item.display);
                    
                    expect(modelDisplays).toEqual(modelNames);
                });
            });
            
            describe('and it is passed as true', () => {
                test('#display should contain symbols and color values', () => {
                    const collection = new BranchCollection(branchListMock, remoteBranchListMock, configMock);
                    const modelNames = collection['_items'].map((item) => item.name);
                    const modelDisplays = collection['_items'].map((item) => item.display);
                    
                    expect(modelDisplays).not.toEqual(modelNames);
                });
            });
        });
    });
});