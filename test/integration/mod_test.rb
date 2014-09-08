require 'test_helper'

class ModIntegrationTest < ActionDispatch::IntegrationTest
  self.use_instantiated_fixtures = true

  def test_create_a_new_mod
    visit '/mods/new'
    fill_in Mod.human_attribute_name(:name), with: 'haha'
    fill_in Mod.human_attribute_name(:code), with: 'ME3111'
    fill_in Mod.human_attribute_name(:description), with: 'This is a cool mod'
    click_button I18n.t('submit')

    assert Mod.first, 'Expected a mod to be created'
    assert_equal root_path, page.current_path
  end

  def test_index
    visit root_path

    assert page.has_content?(@mod.name)
    assert page.has_content?(@mod.code)
  end
end
