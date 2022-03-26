class Player < ApplicationRecord
  has_one :player_state

  has_many :game_states
end
