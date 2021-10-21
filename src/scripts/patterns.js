const MIN_GROUP_SIZE = 3;

export default class PatternMatcher {

    matchGroupsHorizontal(matrix) {
        const groups = [];
        let lastItem = undefined, chainLength = 1, currentGroup = [];
        const maxX = matrix.length, maxY = matrix[0].length;
        // three in a row 
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                const item = matrix[x][y];
                // console.log(item, currentGroup);
                if (item == lastItem) {
                    chainLength++;
                    currentGroup.push({ x, y })
                } else {
                    if (chainLength >= MIN_GROUP_SIZE) {
                        groups.push({ name: lastItem, points: [...currentGroup] });
                    }
                    lastItem = item;
                    chainLength = 1;
                    currentGroup = [{ x, y }];
                }
            }
            if (chainLength >= MIN_GROUP_SIZE) {
                groups.push({ name: lastItem, points: [...currentGroup] });
            }
            lastItem = undefined;
            chainLength = 1;
            // console.log('---end---')
        }

        return groups;
    }

    matchGroupsVertical(matrix) {
        const groups = [];
        let lastItem = undefined, chainLength = 1, currentGroup = [];
        const maxX = matrix.length, maxY = matrix[0].length;
        for (let x = 0; x < maxX; x++) {
            const row = matrix[x];
            for (let y = 0; y < maxY; y++) {
                const item = row[y];
                if (item === lastItem) {
                    chainLength++;
                    currentGroup.push({ x, y });
                } else {
                    if (chainLength >= MIN_GROUP_SIZE) {
                        groups.push({ name: lastItem, points: [...currentGroup] });
                    }
                    lastItem = item;
                    chainLength = 1;
                    currentGroup = [{ x, y }];
                }
            }
            // end of row
            if (chainLength >= MIN_GROUP_SIZE) {
                groups.push({ name: lastItem, points: [...currentGroup] });
            }
            chainLength = 1, lastItem = undefined, currentGroup = [];
        }

        
        return groups;
    }

    matchAllGroups(matrix) {
        return [
            ...this.matchGroupsHorizontal(matrix),
            ...this.matchGroupsVertical(matrix)
        ];
    }
}