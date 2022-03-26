package fi.ikari.rock.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fi.ikari.rock.model.Player;

@Repository
public interface PlayerRepository extends CrudRepository<Player, UUID> {

}
