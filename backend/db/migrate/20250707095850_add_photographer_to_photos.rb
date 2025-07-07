class AddPhotographerToPhotos < ActiveRecord::Migration[8.0]
  def change
    add_column :photos, :photographer, :string
  end
end
