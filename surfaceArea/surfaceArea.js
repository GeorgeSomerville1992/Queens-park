export const city_surface_area = (grid) => {
    // if grid itself is empty - no plot return 0;
    if(grid.length === 0) return 0;
    let totalSurfaceArea = 0;

    grid.forEach((row, rowIndex) => {
        const totalForEachRow = row.reduce(
            (acc, curr, index) => {
                // if value is 0 then there is an empty building.
                if(curr === 0) return 1 + acc; 
                let leftFaceValue = 0;
                let rightFaceValue = 0;
                let northFaceValue = 0;
                let southFaceValue = 0;
                // North face building
                if(grid[rowIndex - 1]) {
                    if(grid[rowIndex - 1][index] && grid[rowIndex - 1][index] > 0) {
                        northFaceValue = Math.abs(grid[rowIndex - 1][index] - curr);
                    } else {                        
                        northFaceValue = curr;
                    }
                } else {
                    northFaceValue = curr;
                }

                // south face building 
                if(grid[rowIndex + 1]) {
                    if(grid[rowIndex + 1][index] && grid[rowIndex + 1][index] > 0) {
                        southFaceValue = Math.abs(grid[rowIndex + 1][index] - curr);
                    } else {
                        southFaceValue = curr;
                    }
                } else {
                    southFaceValue = curr;
                }
                // left side building
                if(row[index - 1] && row[index - 1] > 0) {
                    leftFaceValue = Math.abs(row[index - 1] - curr);
                } else {
                    leftFaceValue = curr;
                }
                // right side building
                if(row[index + 1] && row[index + 1] !== 0) {
                    rightFaceValue = Math.abs(row[index + 1] - curr);
                } else {
                    rightFaceValue = curr;
                }

                // console.log('current', curr);
                // console.log('northFaceValue', northFaceValue);
                // console.log('rightFaceValue', rightFaceValue);
                // console.log('southFaceValue', southFaceValue);
                // console.log('leftFave value', leftFaceValue);

                // console.log('total for current building', northFaceValue + southFaceValue + leftFaceValue + rightFaceValue + 1)
                
                let buildingArea = northFaceValue + southFaceValue + leftFaceValue + rightFaceValue + 1;

                if(row[index - 1] && row[index - 1] > 0) {
                    buildingArea = buildingArea - leftFaceValue;
                }

                // remove double counting for north face
                if(grid[rowIndex - 1] && grid[rowIndex - 1][index] && grid[rowIndex - 1][index] > 0) {
                    buildingArea = buildingArea - northFaceValue
                }

                console.log('building area including subtraction', buildingArea);
                console.log('total for that building including previous', acc + buildingArea);

                const total = acc + buildingArea

                return total;
            }, 
        0);

        totalSurfaceArea = totalSurfaceArea + totalForEachRow;
    });
    return totalSurfaceArea;
};
