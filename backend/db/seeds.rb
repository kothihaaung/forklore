# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Category.destroy_all
Recipe.destroy_all

breakfast = Category.create!(name: "Breakfast")
main_dishes = Category.create!(name: "Main Dishes")
desserts = Category.create!(name: "Desserts")
vegan = Category.create!(name: "Vegan")

recipes_data = [
  {
    title: "Classic Avocado Toast",
    description: "A simple and delicious breakfast favorite with a twist of chili flakes and lemon juice.",
    ingredients: ["2 slices of sourdough bread", "1 ripe avocado", "1/2 lemon juice", "Red pepper flakes", "Sea salt", "Olive oil"],
    instructions: ["Toast the bread until golden brown.", "Mash the avocado with lemon juice, salt, and pepper flakes.", "Spread the mixture onto the toast.", "Drizzle with olive oil and serve."],
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
    cooking_time: 10,
    difficulty: "Easy",
    premium: false,
    price: 0,
    category: breakfast
  },
  {
    title: "Truffle Mushroom Risotto",
    description: "Creamy Italian rice dish infused with earthy mushrooms and luxurious truffle oil.",
    ingredients: ["300g Arborio rice", "200g mixed mushrooms", "1L vegetable broth", "1/2 cup white wine", "2 tbsp truffle oil", "Parmesan cheese", "Shallots", "Garlic"],
    instructions: ["Sauté shallots and garlic in olive oil.", "Add mushrooms and cook until browned.", "Add rice and toast for 2 minutes.", "Add wine and stir until evaporated.", "Gradually add broth, one ladle at a time, until rice is tender.", "Stir in parmesan and drizzle with truffle oil."],
    image_url: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000&auto=format&fit=crop",
    cooking_time: 40,
    difficulty: "Medium",
    premium: true,
    price: 4.99,
    category: main_dishes
  },
  {
    title: "Signature Berry Smoothie Bowl",
    description: "A nutrient-packed bowl of mixed berries, banana, and almond milk topped with granola.",
    ingredients: ["1 cup frozen mixed berries", "1 frozen banana", "1/2 cup almond milk", "Granola", "Chia seeds", "Fresh blueberries"],
    instructions: ["Blend berries, banana, and milk until smooth.", "Pour into a bowl.", "Top with granola, chia seeds, and fresh berries.", "Serve immediately."],
    image_url: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=1000&auto=format&fit=crop",
    cooking_time: 5,
    difficulty: "Easy",
    premium: false,
    price: 0,
    category: breakfast
  },
  {
    title: "Pan-Seared Salmon with Asparagus",
    description: "Wild-caught salmon fillet seasoned with lemon and herbs, served with tender asparagus.",
    ingredients: ["2 salmon fillets", "1 bunch asparagus", "2 tbsp butter", "Lemon slices", "Fresh dill", "Salt & Pepper"],
    instructions: ["Season salmon with salt and pepper.", "Heat butter in a large skillet over medium-high heat.", "Cook salmon for 4 minutes on each side.", "Add asparagus to the skillet and cook until tender.", "Garnish with lemon and dill."],
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop",
    cooking_time: 15,
    difficulty: "Medium",
    premium: true,
    price: 3.50,
    category: main_dishes
  }
]

recipes_data.each do |r|
  Recipe.create!(r.merge(
    ingredients: r[:ingredients].to_json,
    instructions: r[:instructions].to_json
  ))
end

puts "Seed completed: #{Category.count} categories and #{Recipe.count} recipes created."
