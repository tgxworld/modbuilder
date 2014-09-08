require 'test_helper'

class ChaptersTest < ActiveSupport::TestCase
  test "#create_slug" do
    chapter = Chapter.new(name: 'I dont know', chapter_number: 1)

    assert_equal true, chapter.save
    assert_equal 'i-dont-know', chapter.slug
  end
end
