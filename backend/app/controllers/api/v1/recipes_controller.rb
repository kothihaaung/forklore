module Api
  module V1
    class RecipesController < ApplicationController
      def index
        @recipes = Recipe.all
        # For demo, check if user has access to these recipes
        user = User.find_by(email: "test@example.com")
        
        recipes_json = @recipes.map do |recipe|
          unlocked = !recipe.premium || 
                     (user && user.orders.exists?(recipe: recipe, status: 'paid')) ||
                     (user && user.subscriptions.exists?(status: 'active'))
          
          recipe.as_json(include: :category).merge(unlocked: unlocked)
        end

        render json: recipes_json
      end

      def show
        @recipe = Recipe.find(params[:id])
        user = User.find_by(email: "test@example.com")
        
        unlocked = !@recipe.premium || 
                   (user && user.orders.exists?(recipe: @recipe, status: 'paid')) ||
                   (user && user.subscriptions.exists?(status: 'active'))

        response_data = @recipe.as_json(include: :category).merge(unlocked: unlocked)
        
        # Security: Remove sensitive data if locked
        unless unlocked
          response_data[:ingredients] = "[]"
          response_data[:instructions] = "[]"
        end

        render json: response_data
      end
    end
  end
end
