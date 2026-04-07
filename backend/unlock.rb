# Usage: bundle exec rails runner unlock.rb <recipe_id>
# This script manually marks a pending order as paid to simulate a successful webhook.

recipe_id = ARGV[0]
if recipe_id.nil?
  puts "Usage: bundle exec rails runner unlock.rb <recipe_id>"
  exit
end

# Find the latest pending order for this recipe
order = Order.where(recipe_id: recipe_id, status: 'pending').last

if order
  order.update!(status: 'paid')
  puts "✅ SUCCESS: Recipe ##{recipe_id} ('#{order.recipe.title}') is now unlocked for user '#{order.user.email}'."
  puts "Reload the app to see the changes permanently."
else
  puts "❌ ERROR: No pending order found for Recipe ##{recipe_id}."
  puts "Hint: Make sure you clicked 'Unlock' in the app first to create the pending order!"
end
