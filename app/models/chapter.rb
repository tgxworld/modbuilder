class Chapter < ActiveRecord::Base
  default_scope { order(:chapter_number) }

  belongs_to :mod

  validates :name, presence: true
  validates :chapter_number, presence: true, uniqueness: { scope: :mod_id }
  validates :slug, presence: true

  before_validation :create_slug

  def to_param
    self.slug
  end

  private

  def create_slug
    self.slug = generate_slug(self.name)
  end
end
