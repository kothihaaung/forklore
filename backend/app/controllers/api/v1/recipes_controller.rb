module Api
  module V1
    class RecipesController < ApplicationController
      def index
        @recipes = Recipe.all
        render json: @recipes.as_json(include: :category)
      end

      def show
        @recipe = Recipe.find(params[:id])
        # Simple logic: If premium and not bought, hide some details (mocked for now)
        # In a real app, we would check user's orders or subscription
        render json: @recipe.as_json(include: :category)
      end
    end
  end
end
