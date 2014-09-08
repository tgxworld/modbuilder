class Chapter < ActiveRecord::Base
  default_scope { order(:chapter_number) }

  belongs_to :mod

  validates :name, presence: true
  validates :chapter_number, presence: true, uniqueness: { scope: :mod_id }
end
