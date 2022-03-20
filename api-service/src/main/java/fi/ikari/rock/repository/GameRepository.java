package fi.ikari.rock.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fi.ikari.rock.model.Game;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

}
