class PlayerStates < ActiveRecord::Migration[7.0]
  include ::UpdatedAtTrigger

  def change
    create_table :player_states, id: :uuid do |t|
      t.string :status, null: false
      t.datetime :last_ping

      t.timestamps default: -> { 'now()' }, null: false
    end

    add_updated_at_trigger(:player_states)

    add_reference(
      :player_states,
      :player,
      null: false,
      foreign_key: true,
      type: :uuid,
      index: { name: 'idx_player_state_player' })
  end
end
