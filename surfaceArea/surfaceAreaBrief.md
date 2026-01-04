Task
You are given a map of a city. Obviously, just like every other city, it has buildings in it. Your task is to write a function that, based on an input of a city (see formatting below), will return the surface area of the city. Surface area is a measure of the total area, both horizontal and vertical, that the surface of the city occupies.

Input
Rectangular list of lists of integers.

Output
Integer value of the total surface area.

Input formatting
The measure of each element of the grid is 1 x 1. Each cell will have an integer indicating the height in it: if it is 0, then it's the ground; otherwise it is implying the height of a building. Note that height will always be a non-negative number. For example:

[
[3, 3, 0, 0, 0],
[3, 3, 0, 2, 2],
[0, 0, 0, 0, 2],
[0, 0, 0, 2, 2],
[0, 3, 3, 0, 0]
]

3D visualization, from 2 perspectives:

+-----------+ +-----------+
|\ \ / /|
| \ \ / / |
| \ \ / / |
| +-----------+ +-----+-----+ +-----------+ | +-----+-----+
| | | |\ \ | | | / /|

- | |...| +-----+ \ | | +.+-----+ / |..
  \ | |...| | |\ \ | | /..| / / |.
  \ | +-----------+---+ \ | +-----------+.+-----+ / +
  \| |\ \ \ |/ /|/ / /
  +---------| +-----------+---------+ +-----------+ |-----------+ /
  .........| | | | .| | | | /
  ........| | | | ..| | | | /
  .......| | | | ...| | | |/
  ......+ | |---------+ ....| | +-----------+
  ......\| |........... .....| |/............
  ......+-----------+............ ......+-----------+............
  Buildings can be connected to each other, as seen in the ASCII art above. E.g. the 2 x 2 square, all having 3, at the left-top indicates that there is a 2x2 building with height of 3, not 4 separate buildings. Same logic applies to other buildings.

Examples
city_surface_area([
[0, 0, 0],
[0, 1, 0],
[0, 0, 0],
]) # returns 13

city_surface_area([
[1, 0, 1],
[0, 1, 0],
[1, 0, 1],
]) # returns 29

city_surface_area([
[1, 2, 3],
]) # returns 21
