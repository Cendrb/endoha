require 'test_helper'

class EndohaControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get endoha_index_url
    assert_response :success
  end

  test "should get update_binding" do
    get endoha_update_binding_url
    assert_response :success
  end

end
