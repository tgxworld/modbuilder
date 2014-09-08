class Mod < ActiveRecord::Base
  has_many :chapters

  validates :name, presence: true
  validates :code, presence: true, uniqueness: true
  validates :slug, presence: true

  before_validation :create_slug

  def to_param
    self.slug
  end

  private

  def create_slug
    self.slug = generate_slug(self.code)
  end
end
