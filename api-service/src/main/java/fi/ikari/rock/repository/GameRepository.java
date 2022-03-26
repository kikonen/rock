package fi.ikari.rock.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fi.ikari.rock.model.Game;

@Repository
public interface GameRepository extends CrudRepository<Game, UUID> {

}
