
import PatternMatcher from './patterns';

const matcher = new PatternMatcher();

const TEST_GROUP_0 = [['no'], ['groups'], ['here']];
const TEST_GROUP_1 = [['yeah'], ['yeah'], ['yeah']];

describe('pattern matching', () => {
    // matrices are 90deg flipped, nested arrays are columns, not rows
    it('reads 3 and more in a horizontal line', () => {
        expect(matcher.matchGroupsHorizontal(TEST_GROUP_0).length).toBe(0);
        expect(matcher.matchGroupsHorizontal(TEST_GROUP_1).length).toBe(1);
    })
})