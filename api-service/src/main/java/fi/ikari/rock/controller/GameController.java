package fi.ikari.rock.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fi.ikari.rock.model.Game;
import fi.ikari.rock.model.GameState;
import fi.ikari.rock.model.Player;
import fi.ikari.rock.repository.GameRepository;
import fi.ikari.rock.repository.GameStateRepository;
import fi.ikari.rock.repository.PlayerRepository;

@RestController
class GameController {

  private final GameRepository repository;
  private final PlayerRepository playerRepository;
  private final GameStateRepository stateRepository;

  GameController(GameRepository repository, PlayerRepository playerRepository, GameStateRepository stateRepository) {
    this.repository = repository;
    this.playerRepository = playerRepository;
    this.stateRepository = stateRepository;
  }

  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/games")
  Iterable<Game> all() {
    return repository.findAll();
  }
  // end::get-aggregate-root[]

  @PostMapping("/games")
  Game newGame(@RequestBody Game newGame) {
	List<GameState> states = newGame.getGameStates();
	newGame.setGameStates(null);
    Game saved = repository.save(newGame);
	
	for (GameState state : states) {
		state.setGameId(newGame.getId());
		Player player = playerRepository.findById(state.getPlayer().getId()).get();
		state.setPlayer(player);
		stateRepository.save(state);
	}

	return saved;
  }

  // Single item

  @GetMapping("/games/{id}")
  Game one(@PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .orElseThrow(() -> new GameNotFoundException(id));
  }

  @PutMapping(value = "/games/{id}", consumes={"application/json"})
  Game replaceGame(@RequestBody Game newGame, @PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .map(game -> {
        game.setStatus(newGame.getStatus());
        return repository.save(game);
      })
      .orElseGet(() -> {
        newGame.setId(UUID.fromString(id));
        return repository.save(newGame);
      });
  }

  @DeleteMapping("/games/{id}")
  void deleteGame(@PathVariable String id) {
    repository.deleteById(UUID.fromString(id));
  }
}
