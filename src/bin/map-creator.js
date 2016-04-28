import _ from 'lodash';
import { createPlayer, createEnemy } from './entity-creator';
import makeGrid from './grid';

import * as c from '../constants/settings';

export default () => {

  const createRandomRoom = (coords = c.STARTING_ROOM_POSITION, sizeRange = c.ROOM_SIZE_RANGE) => {
    const [a,b] = sizeRange;
    const [x,y] = coords;
    return {
      height: _.random(a,b),
      width: _.random(a,b),
      x,
      y
    }
  }

  const placeRoom = (room) => {
    //this function puts a new room in to the world, checks if the world is
    //still valid and then replaces the old world with the new one if it is

    //don't place the room if it is outside the boundaries of the world
    if (room.y < 0 || room.y + room.height > world.length){
      return;
    }
    if (room.x < 0 || room.x + room.width > world[0].length){
      return;
    }

    let tempWorld = _.cloneDeep(world);
    //attempt to build up the room on to a clone of the world

    let x = room.x -1; //deduct one for the first loop
    for (let i = 0; i < room.width; i++){
      x++;
      let y = room.y -1;  //deduct one for the first loop
      for (let j = 0; j < room.height; j++){
        y++;
        //if the coord already has a room, break out of this function and
        //don't overwrite the existing world.
        // Otherwise place a cell.
        if (tempWorld[y][x]){
          return;
        } else {
          tempWorld[y][x] = { type: 'floor'};
        }
      }
    }

    if (room.door){
      tempWorld[room.door.y][room.door.x] = { type: 'door' };
    }

      world = tempWorld;
      roomCounter++
      seedRooms.push(room);
  }

  let roomPlacer = (startingRoom) => {
    //try east wall
    let room = createRandomRoom();
    room.y = _.random(startingRoom.y, startingRoom.height + startingRoom.y - 1);
    room.x = startingRoom.x + startingRoom.width + 1;
    room.door = {
      y: _.random(room.y, (Math.min(room.y + room.height, startingRoom.y + startingRoom.height)) - 1),
      x: room.x - 1
    };
    placeRoom(room);
    //from west wall
    room = createRandomRoom();
    room.y = _.random(startingRoom.y, startingRoom.height + startingRoom.y - 1);
    room.x = startingRoom.x - room.width - 1;
    room.door = {
      y: _.random(room.y, (Math.min(room.y + room.height, startingRoom.y + startingRoom.height)) - 1),
      x: startingRoom.x - 1
    }
    placeRoom(room);
    //from south wall
    room = createRandomRoom();
    room.y = startingRoom.y + startingRoom.height + 1;
    room.x = _.random(startingRoom.x, startingRoom.width + startingRoom.x - 1);
    room.door = {
      y: startingRoom.y + startingRoom.height,
      x: _.random(room.x, (Math.min(room.x + room.width, startingRoom.x + startingRoom.width)) - 1)
    }
    placeRoom(room);
    //from north wall
    room = createRandomRoom();
    room.y = startingRoom.y - room.height - 1;
    room.x = _.random(startingRoom.x, startingRoom.width + startingRoom.x - 1);
    room.door = {
      y: startingRoom.y - 1,
      x: _.random(room.x, (Math.min(room.x + room.width, startingRoom.x + startingRoom.width)) - 1)
    }
    placeRoom(room);
  }

  //here begins the process of building out the map
  let seedRooms = []; //seed rooms will be populated by placeRoom function
  let roomCounter = 0; //room counter will be advanced by placeRoom function
  let world = makeGrid(c.GRID_HEIGHT,c.GRID_WIDTH);
  placeRoom(createRandomRoom()); // we need one room to start from
  // keep trying to place the rooms until we run out of rooms or hit our limit
  while(roomCounter < 15  && seedRooms.length > 0){
    roomPlacer(seedRooms.pop());
  }

  //add random opacity to the background cells and replace doors with floors
  let cleanedWorld = world.map(row => {
  return row.map(cell => {
    if (cell === 0) {
      return {
        type: 0,
        opacity: _.random(0.3,0.8)
      }
    }
    if (cell.type === 'door'){
      return {type: 'floor'};
    } else {
      return cell;
    }
  })
})

return cleanedWorld;
}
