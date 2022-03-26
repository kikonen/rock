package fi.ikari.rock.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fi.ikari.rock.model.Player;
import fi.ikari.rock.repository.PlayerRepository;
import fi.ikari.rock.repository.PlayerRepository;

@RestController
class PlayerController {

  private final PlayerRepository repository;

  PlayerController(PlayerRepository repository) {
    this.repository = repository;
  }

  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/players")
  Iterable<Player> all() {
    return repository.findAll();
  }
  // end::get-aggregate-root[]

  @PostMapping("/players")
  Player newPlayer(@RequestBody Player newPlayer) {
    return repository.save(newPlayer);
  }

  // Single item

  @GetMapping("/players/{id}")
  Player one(@PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .orElseThrow(() -> new PlayerNotFoundException(id));
  }

  @PutMapping("/players/{id}")
  Player replacePlayer(@RequestBody Player newPlayer, @PathVariable String id) {

    return repository.findById(UUID.fromString(id))
      .map(player -> {
        player.setName(newPlayer.getName());
        return repository.save(player);
      })
      .orElseGet(() -> {
        newPlayer.setId(UUID.fromString(id));
        return repository.save(newPlayer);
      });
  }

  @DeleteMapping("/players/{id}")
  void deletePlayer(@PathVariable String id) {
    repository.deleteById(UUID.fromString(id));
  }
}
