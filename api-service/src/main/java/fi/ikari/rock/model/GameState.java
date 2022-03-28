package fi.ikari.rock.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;;

@Entity
@Table(name = "game_states")
public class GameState {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private UUID id;

    private String status;
    private String hand;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "player_id")
    private UUID player_id;

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setHand(String hand) {
        this.hand = hand;
    }

    public String getHand() {
        return hand;
    }

	public UUID getGameId() {
		return gameId;
	}

	public void setGameId(UUID gameId) {
		this.gameId = gameId;
	}

	public UUID getPlayer_id() {
		return player_id;
	}

	public void setPlayer_id(UUID player_id) {
		this.player_id = player_id;
	}

}
