module ActiveRecordExtension
  extend ActiveSupport::Concern

  def generate_slug(string)
    string.downcase.gsub(' ', '-')
  end
end

ActiveRecord::Base.send(:include, ActiveRecordExtension)
