# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

players = Player.create([{ name: "Mad" }, { name: "Twit" }])
players.each do |player|
  PlayerState.create({ status: 'pending', player: player})
end

game = Game.create({ status: 'pending' })

players.each do |player|
  GameState.create({ status: 'pending', player: player, game: game})
end
