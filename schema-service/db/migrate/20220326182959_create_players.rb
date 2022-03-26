class CreatePlayers < ActiveRecord::Migration[7.0]
  include ::UpdatedAtTrigger

  def change
    create_table :players, id: :uuid do |t|
      t.string :name

      t.timestamps default: -> { 'now()' }, null: false

      t.index [:name], unique: true
    end

    add_updated_at_trigger(:players)
  end
end
