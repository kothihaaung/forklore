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

photo_urls.each do |url|
  filename = File.basename(url, ".jpg")
  category = filename.split(/\d+/).first.gsub("-", " ").capitalize

  Photo.create!(
    title: filename.capitalize,
    image_url: url,
    category: category
  )
end
