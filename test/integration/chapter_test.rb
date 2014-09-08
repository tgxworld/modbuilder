require 'test_helper'

class ChapterTest < ActionDispatch::IntegrationTest
  self.use_instantiated_fixtures = true

  def test_create_a_new_chapter
    chapter_name = 'Something'
    chapter_number = 1

    visit new_mod_chapter_path(@mod)
    fill_in Chapter.human_attribute_name(:name), with: chapter_name
    fill_in Chapter.human_attribute_name(:chapter_number), with: 1
    click_button I18n.t('submit')

    chapter = Chapter.first
    assert_equal chapter_name, chapter.name
    assert_equal chapter_number, chapter.chapter_number
    assert_equal @mod, chapter.mod
    assert_equal mod_path(@mod), page.current_path
  end
end
