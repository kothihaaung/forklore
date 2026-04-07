class Recipe < ApplicationRecord
  belongs_to :category
  has_many :orders

  # Ingredients and instructions are strings but can be parsed as JSON if needed by the frontend
  validates :title, presence: true
end
