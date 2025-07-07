class CreatePhotos < ActiveRecord::Migration[8.0]
  def change
    create_table :photos do |t|
      t.string :title
      t.string :image_url
      t.string :category

      t.timestamps
    end
  end
end
