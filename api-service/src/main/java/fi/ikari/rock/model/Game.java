package fi.ikari.rock.model;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private UUID id;

    private String status;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;
   
    @OneToMany
    @JoinColumn(name = "game_id")
    private Set<GameState> gameStates;

//    @ManyToMany
//    @JoinTable(name = "game_states",
//    	joinColumns = { @JoinColumn(name = "“game_id") },
//        inverseJoinColumns = { @JoinColumn(name = "player_id") })
//    @JsonManagedReference
//    private Set<Player> players;


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

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Set<GameState> getGameStates() {
		return gameStates;
	}

	public void setGameStates(Set<GameState> gameStates) {
		this.gameStates = gameStates;
	}

//	public Set<Player> getPlayers() {
//		return players;
//	}
//
//	public void setPlayers(Set<Player> players) {
//		this.players = players;
//	}
       
}
