class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.string :name
      t.integer :chapter_number
      t.integer :mod_id

      t.timestamps
    end

    add_index :chapters, :mod_id
  end
end
