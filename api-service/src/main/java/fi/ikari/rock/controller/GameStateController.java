package fi.ikari.rock.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fi.ikari.rock.model.GameState;
import fi.ikari.rock.repository.GameStateRepository;

@RestController
class GameStateController {

  private final GameStateRepository repository;

  GameStateController(GameStateRepository repository) {
    this.repository = repository;
  }

  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/game_states")
  Iterable<GameState> all() {
    return repository.findAll();
  }
  // end::get-aggregate-root[]

  @PostMapping("/game_states")
  GameState newGameState(@RequestBody GameState newState) {
    return repository.save(newState);
  }

  // Single item

  @GetMapping("/game_states/{id}")
  GameState one(@PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .orElseThrow(() -> new GameStateNotFoundException(id));
  }

  @PutMapping(value = "/game_states/{id}", consumes={"application/json"})
  GameState replaceState(@RequestBody GameState newState, @PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .map(state -> {
    	  if (newState.getStatus() != null) {
    		  state.setStatus(newState.getStatus());
    	  }
    	  if (newState.getHand() != null) {
    		  state.setHand(newState.getHand());
    	  }
        return repository.save(state);
      })
      .orElseThrow(() -> new GameStateNotFoundException(id));
  }

  @DeleteMapping("/GameStates/{id}")
  void deleteState(@PathVariable String id) {
    repository.deleteById(UUID.fromString(id));
  }
}
