require 'test_helper'

class ModTest < ActiveSupport::TestCase
  test "#create_slug" do
    mod = Mod.new(name: 'I dont know', code: 'ME4242')

    assert_equal true, mod.save
    assert_equal 'me4242', mod.slug
  end
end
