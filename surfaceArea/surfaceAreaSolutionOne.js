function citySurfaceArea(map) {
  let area = map.length * map[0].length;
  
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      area += Math.max(0, map[i][j] - (map[i][j + 1] || 0));
      area += Math.max(0, map[i][j] - (map[i + 1]?.[j] || 0));
      area += Math.max(0, map[i][j] - (map[i - 1]?.[j] || 0));
      area += Math.max(0, map[i][j] - (map[i][j - 1] || 0));
    }
  }
  
  return area;
}