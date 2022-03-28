package fi.ikari.rock.controller;

import java.util.UUID;

class GameStateNotFoundException extends RuntimeException {

  GameStateNotFoundException(UUID id) {
    super("Could not find game " + id);
  }

  GameStateNotFoundException(String id) {
	    super("Could not find game " + id);
	  }
}
