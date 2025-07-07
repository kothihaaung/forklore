# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'

photo_urls = [
  "https://kothihaaung.github.io/assets/images/food/burger1.jpg",
  "https://kothihaaung.github.io/assets/images/food/burger2.jpg",
  "https://kothihaaung.github.io/assets/images/food/burger3.jpg",
  "https://kothihaaung.github.io/assets/images/food/cookie1.jpg",
  "https://kothihaaung.github.io/assets/images/food/fish1.jpg",
  "https://kothihaaung.github.io/assets/images/food/grill1.jpg",
  "https://kothihaaung.github.io/assets/images/food/ice-cream1.jpg",
  "https://kothihaaung.github.io/assets/images/food/ice-cream2.jpg",
  "https://kothihaaung.github.io/assets/images/food/ice-cream3.jpg",
  "https://kothihaaung.github.io/assets/images/food/pan-cake1.jpg",
  "https://kothihaaung.github.io/assets/images/food/pasta1.jpg",
  "https://kothihaaung.github.io/assets/images/food/pasta2.jpg",
  "https://kothihaaung.github.io/assets/images/food/pizza1.jpg",
  "https://kothihaaung.github.io/assets/images/food/pizza2.jpg",
  "https://kothihaaung.github.io/assets/images/food/pizza3.jpg",
  "https://kothihaaung.github.io/assets/images/food/ramen1.jpg",
  "https://kothihaaung.github.io/assets/images/food/sushi1.jpg",
  "https://kothihaaung.github.io/assets/images/food/sushi2.jpg",
  "https://kothihaaung.github.io/assets/images/food/sushi3.jpg",
  "https://kothihaaung.github.io/assets/images/food/taco1.jpg",
  "https://kothihaaung.github.io/assets/images/food/toast1.jpg"
]

creative_titles = [
  "Golden Crispy Delight", "Midnight Snack Attack", "Flavors of the East",
  "Sweet Tooth Fantasy", "Charred to Perfection", "Ocean on a Plate",
  "Melting Moments", "Piled High & Proud", "Dreamy Dessert Daze",
  "Stacked Sunday Treats", "A Taste of Italy", "Noodle Nirvana",
  "Slice of Heaven", "Rolling in Flavor", "Frosted Fun", "Street Food Magic",
  "Crunchy & Creamy", "Pantry Gourmet", "Classic Comfort", "Seaside Sunset"
]

photographer_names = [
  "Liam Wong", "Ava Smith", "Noah Tanaka", "Mia Choi", "Ethan Becker",
  "Isabella Nguyen", "Lucas Kim", "Sophie Mehta", "Oliver Li", "Emily Tran"
]

Photo.delete_all

photo_urls.each_with_index do |url, index|
  filename = File.basename(url, ".jpg")
  category = filename.split(/\d+/).first.gsub("-", " ").capitalize

  Photo.create!(
    title: creative_titles[index % creative_titles.size],
    image_url: url,
    category: category,
    photographer: photographer_names.sample
  )
end
