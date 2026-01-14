const citySurfaceArea = (m) => {
  
  // DETERMINE NUMBER OF ROWS, COLUMNS, AND BUILDINGS
  const rC = m.length;
  const cC = m[0].length;
  const tB = rC * cC;
  
  // CREATE SURFACE AREA VARIABLE (START WITH TOTAL BUILDINGS TO ACCOUNT FOR TOPS OF BUILDINGS)
  let sA = tB;
  
  // LOOP THROUGH EVERY BUILDING
  for (let bI = 0; bI < tB; bI++) {
    
    // DETERMINE ROW AND COLUMN INDEXES
    const r = Math.floor(bI / cC);
    const c = bI % cC;
    
    // DETERMINE CURRENT ROW AND BUILDING
    const cR = m[r];
    const bH = cR[c];
    
    // DETERMINE SURFACE AREA OF ALL SIDES
    const s1 = Math.max(bH - (m[r - 1]?.[c] || 0), 0);
    const s2 = Math.max(bH - (cR[c + 1] || 0), 0);
    const s3 = Math.max(bH - (m[r + 1]?.[c] || 0), 0);
    const s4 = Math.max(bH - (cR[c - 1] || 0), 0);
    
    // ADD TO TOTAL SURFACE AREA
    sA += s1 + s2 + s3 + s4;
  }
  
  // RETURN TOTAL SURFACE AREA
  return sA;
}