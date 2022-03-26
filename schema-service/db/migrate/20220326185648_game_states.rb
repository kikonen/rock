class GameStates < ActiveRecord::Migration[7.0]
  def change
    create_table :game_states, id: :uuid do |t|
      t.string :status
      t.string :hand

      t.timestamps default: -> { 'now()' }, null: false
    end

    add_updated_at_trigger(:game_states)

    add_reference(
      :game_states,
      :player,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_game_state_player' })

    add_reference(
      :game_states,
      :game,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_game_state_game' })
  end
end
