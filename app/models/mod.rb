class Mod < ActiveRecord::Base
  has_many :chapters

  validates :name, presence: true
  validates :code, presence: true, uniqueness: true
end
