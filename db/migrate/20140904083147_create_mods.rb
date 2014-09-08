class CreateMods < ActiveRecord::Migration
  def change
    create_table :mods do |t|
      t.string :name
      t.string :code
      t.text :description
      t.string :slug

      t.timestamps
    end

    add_index :mods, :slug
  end
end
