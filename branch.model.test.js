const BranchModel = require('./branch.model.js');

describe('BranchModel', () => {
    const branchNameMock = 'foo';
    const displayBranchNameMock = ' \x1B[33m●\x1B[39m foo';
    const branchMock = {
        name: 'foo',
        commit: {
          sha: '',
          url: ''
        },
        protected: false
      }
    
    describe('when called with invalid params', () => {
        describe('when called without params', () => {
            test('should throw', () => {
                expect(() => new BranchModel()).toThrow();
            });
        });
        
        describe('when called without #branch', () => {
            test('should throw', () => {
                expect(() => new BranchModel(undefined, displayBranchNameMock, branchMock)).toThrow();
            });
        });
    });
    
    describe('when called with valid params', () => {
        test('should not throw', () => {
            expect(() => new BranchModel(branchNameMock, displayBranchNameMock, branchMock)).not.toThrow();
        });
    });
});