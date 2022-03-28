package fi.ikari.rock.model;

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

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private UUID id;

    private String name;
    
    @OneToMany
    @JoinColumn(name = "player_id")
    @JsonBackReference
    private Set<GameState> gameStates;
    
//    @ManyToMany
//    @JoinTable(name = "game_states",
//    	joinColumns = { @JoinColumn(name = "player_id") },
//        inverseJoinColumns = { @JoinColumn(name = "game_id") })
//    @JsonBackReference	
//    private Set<Game> games;

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
	
	public Set<GameState> getGameStates() {
		return gameStates;
	}

	public void setGameStates(Set<GameState> gameStates) {
		this.gameStates = gameStates;
	}
}
