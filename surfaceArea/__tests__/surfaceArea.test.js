
import { city_surface_area } from '../surfaceArea.js';

describe('city Surface area', () => {
  it('no plot', () => {
    const area = city_surface_area([]);
    expect(area).toBe(0);
  });

  it('single empty plot', () => {
    const area = city_surface_area([
      [0]
    ]);
    expect(area).toBe(1);
  })

  it('double empty plot', () => {
    const area = city_surface_area([
      [0, 0]
    ]);
    expect(area).toBe(2);
  })

    it('grid of empty plots', () => {
    const area = city_surface_area([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(area).toBe(9);
  });
  
 it('single building', () => {
    const area = city_surface_area([
      [1]
    ]);

    expect(area).toBe(5);
  })

  it('a single large building', () => {
    const area = city_surface_area([
      [5]
    ]);

    expect(area).toBe(21);
  })



  it('single building and empty plot', () => {
    const area = city_surface_area([
      [0, 1]
    ]);

    expect(area).toBe(6);
  });



  it('grid: single building and empty plot multiple rows', () => {
    const area = city_surface_area([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
    
    expect(area).toBe(13);
  })

it('two joined buildings same height', () => {
  const area = city_surface_area([
    [1, 1]
  ]);
  expect(area).toBe(8);
});

it('two joined buildings different height', () => {
  // right side is joined 
  // first building
  //4 * 1 + 1 = 5

  // second building
  // 3 * 2 = 6 => 3 empty spaces
  // + 2 - 1, diffence in left space - 1
  // ground + 1
  // = 8

  const area = city_surface_area([
    [1, 2]
  ]);
  expect(area).toBe(12);
});

it('two joined buildings of larger different height', () => {
  // [[9,4]] said it should be 46 

  // first building
  // ground 1 
  // left, north, south. 3 * 9 = 27
  // right - difference 5
  // total 33

  // second building

  // ground 1
  // left - difference 5
  // north, south, right - 3 * 4 = 12
  // total 18
  // 33 + 18 = 51
  // 5 - shared wall counted twice. 
  // 46

  const area = city_surface_area([
    [9, 4]
  ]);
  expect(area).toBe(46);
})


it('small line of buildings', () => {
  const area = city_surface_area([
    [1, 2, 3],
  ]); 

  expect(area).toBe(21);
});


it('larger line of buildings', () => {
  const area = city_surface_area([
    [4,10,8,3]
  ]);
  expect(area).toBe(74);
});

it('multiple empty', () => {
  // 29 according to test
  // 4 * 1 - empty plot 
  // + 1 + 6 * 4 (25) = 4
  // ground + sides

  const area = city_surface_area([
    [0],
    [0],
    [0],
    [0],
    [6]
  ]); 

  expect(area).toBe(29);
});

/*
  first row 
  8 * 4 + 1 = 33
  - difference from one below - 7 
  = 32

  second row

  4 * 1 + 1 = 5

  third row
  4 * 1 + 1 = 5

  4th row
  1
  total 33 + 5 + 5 + 1 = 44
*/

it('building with joining south', () => {
  const area = city_surface_area([
    [8],
    [1],
    [1],
    [0]
  ]); 

  expect(area).toBe(40);
});

it('difference between to buildings north and south', () => {
  const area = city_surface_area([[5],[9]]);

  expect(area).toBe(48);
})

it('difference between to buildings north and south and one empty plot', () => {

  // first building

  /*
    North - 5
    right - 5
    South - 4
    left: - 5
    top: - 1

    total: 20

  */

  // second building

  /*
    North - 4
    right - 9
    South - 9
    left - 9
    top - 1
    
    total: 32

  */

  // third building

  /* 
    all sides - 0
    top - 1

    total: 1
  */

  // total 53
  // 

  // remove double counted here - 
  // one before middle - 4
  // total - 49

  const area = city_surface_area([
    [5],
    [9],
    [0]
  ]);

  expect(area).toBe(49);
})

it('large single buildings', () => {
  const area = city_surface_area([
    [0],
    [2],
    [0],
    [0],
    [6],
    [4],
    [0]
  ]);

  expect(area).toBe(47);
});

  it('mutiple columns and rows', () => {
      const area = city_surface_area([
        [0,0],
        [5,1]
      ]); 

      expect(area).toBe(26);
  }); 

  it('calculates the area for a big town', () => {
    const area = city_surface_area([
      [5, 5, 0, 0, 0],
      [5, 5, 0, 2, 2],
      [0, 0, 0, 0, 2],
      [0, 0, 0, 2, 2],
      [0, 3, 3, 0, 0]
    ]);

    expect(area).toBe(107);

  });

  it('does a city', () => {
    // need to do the top/bottom rows.
    const area = city_surface_area([
        [9, 9, 0, 0, 0, 0, 0],
        [9, 9, 0, 7, 7, 7, 7],
        [9, 9, 0, 7, 7, 7, 7],
        [9, 9, 0, 7, 7, 7, 7],
        [0, 0, 0, 0, 0, 0, 0],
        [6, 6, 6, 6, 3, 3, 0],
        [6, 6, 6, 6, 3, 3, 0]
    ]);

    expect(area).toBe(339);
  });

  // remove double counting with south?
  it('strange area of plot', () => {
    // first row...
      // first building (north, right, south, left, top)
        //  4, 2, 2, 4, 1 = 13 
      // second building
        // 2, 2, 1, 2, 1 = 8
      // third building 
        // 1
      // remove difference with first building - 2

      // total = 20
    
    // second row
      // first building (north, right, south, left, top)
        // 2, 1, 2, 2, 1 = 8 - correct
      // second building (building right in the middle)
        // 1, 1, 1, 1, 1 = 5
        // remove double counting - 2 (left and north)
        // total = 3
      // 

    // 3 * 2 + 1 + 2 = 9
    // 4 * 0 + 1 = 1
    // remove double counting of middle => -2
    // 

    // value of first row = 25

    const area = city_surface_area([
      [4, 2, 0],
      [2, 1, 2],
      [0, 2, 4]
    ]);

    expect(area).toBe(53);
  });
});
