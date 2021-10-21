import PatternMatcher from './patterns';

const matcher = new PatternMatcher();

const TEST_GROUP_0 = [['no', 'groups', 'here']];
const TEST_GROUP_1 = [
    ['A', 'p', 'X', 'a', 'b'],
    ['c', 'd', 'X', 'd', 'x'],
    ['c', 'b', 'X', 'm', 'l'],
];
const TEST_GROUP_2 = [
    [4, 0, 0, 2],
    [4, 0, 0, 2],
    [4, 0, 0, 2],
    [4, 0, 0, 2],
];

const TEST_GROUP_3 = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 0, 0, 1, 2],
    [1, 2, 0, 2, 5, 1],
    [4, 2, 3, 2, 5, 1],
    [4, 2, 0, 2, 5, 1],
    [4, 2, 1, 1, 4, 1],
];

const TEST_VERT_GROUP_0 = [
    ['cow', 'cow', 'cow'],
    ['parrot', 'doge', 'cat'],
    ['parrot', 'doge', 'cat'],
]

const TEST_VERT_GROUP_1 = [
    [1,2,3,4,5,6],
    [7,8,1,1,1,3],
    [1,2,3,4,5,6],
]

const TEST_VERT_GROUP_2 = [
    [3,3,3,4,5,6],
    [7,8,1,1,1,1],
    [1,2,4,4,4,4],
]

const FINAL_TEST = [
    ['cow', 'cow', 'cow', 'tuna'],
    ['cow', 'snake', 'hog', 'cat'],
    ['cow', 'snake', 'hog', 'cat'],
    ['cow', 'dog', 'frog', 'rhino'],
];

describe('pattern matching', () => {
    // matrices are 90deg flipped, nested arrays are columns, not rows

    it('reads 3 and more in a vertical line', () => {
        expect(matcher.matchGroupsVertical(TEST_VERT_GROUP_0).length).toBe(1);
        expect(matcher.matchGroupsVertical(TEST_VERT_GROUP_1).length).toBe(1);
        expect(matcher.matchGroupsVertical(TEST_VERT_GROUP_2).length).toBe(3);
    })

    it('reads 3 and more in a horizontal line', () => {
        expect(matcher.matchGroupsHorizontal(TEST_GROUP_0).length).toBe(0);

        const groups1 = matcher.matchGroupsHorizontal(TEST_GROUP_1);
        expect(groups1.length).toBe(1);
        expect(groups1[0].name).toBe('X')
        expect(groups1[0].points
            .map((({ x, y }) => `(${x},${y}),`))
            .join('')
        ).toContain('(0,2),(1,2),(2,2)');

        const groups2 = matcher.matchGroupsHorizontal(TEST_GROUP_2);
        expect(groups2.length).toBe(4);
        expect(groups2[0].name).toBe(4)
        expect(groups2[1].name).toBe(0)
        expect(groups2[2].name).toBe(0)
        expect(groups2[3].name).toBe(2)
        expect(groups2[0].points
            .map((({ x, y }) => `(${x},${y}),`))
            .join('')
        ).toContain('(0,0),(1,0),(2,0),(3,0)');
        expect(groups2[3].points
            .map((({ x, y }) => `(${x},${y}),`))
            .join('')
        ).toContain('(0,3),(1,3),(2,3),(3,3)');

        const groups3 = matcher.matchGroupsHorizontal(TEST_GROUP_3);
        expect(groups3.length).toBe(6);
        expect(groups3[0].name).toBe(1);
        expect(groups3[1].name).toBe(4);
        expect(groups3[2].name).toBe(2);
        expect(groups3[3].name).toBe(2);
        expect(groups3[4].name).toBe(5);
        expect(groups3[5].name).toBe(1);
    })

    it('can find horizontal and vertical groups', () => {
        const result = matcher.matchAllGroups(FINAL_TEST);
        expect(result.length).toBe(2);
        expect(result[0].name).toBe('cow');
        expect(result[1].name).toBe('cow');
    });
})
