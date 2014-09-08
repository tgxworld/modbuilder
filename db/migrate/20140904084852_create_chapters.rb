class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.string :name
      t.integer :chapter_number
      t.string :slug
      t.integer :mod_id

      t.timestamps
    end

    add_index :chapters, :mod_id
    add_index :chapters, :slug
  end
end
