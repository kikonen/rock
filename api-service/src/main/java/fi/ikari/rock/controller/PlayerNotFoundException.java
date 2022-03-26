package fi.ikari.rock.controller;

import java.util.UUID;

class PlayerNotFoundException extends RuntimeException {

  PlayerNotFoundException(UUID id) {
    super("Could not find game " + id);
  }

  PlayerNotFoundException(String id) {
	    super("Could not find game " + id);
	  }
}
