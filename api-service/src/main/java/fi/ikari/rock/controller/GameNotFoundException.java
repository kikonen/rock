package fi.ikari.rock.controller;

import java.util.UUID;

class GameNotFoundException extends RuntimeException {

  GameNotFoundException(UUID id) {
    super("Could not find game " + id);
  }

  GameNotFoundException(String id) {
	    super("Could not find game " + id);
	  }
}
