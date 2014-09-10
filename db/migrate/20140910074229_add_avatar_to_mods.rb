class AddAvatarToMods < ActiveRecord::Migration
  def change
    add_column :mods, :avatar, :string
  end
end
