class CreateGames < ActiveRecord::Migration[7.0]
  include ::UpdatedAtTrigger

  def change
    create_table :games, id: :uuid do |t|
      t.string :status
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps default: -> { 'now()' }, null: false
    end

    add_updated_at_trigger(:games)
  end
end
