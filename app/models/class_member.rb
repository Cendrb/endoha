require "uri"
require "net/http"

class ClassMember < ApplicationRecord
  has_many :book_class_member_bindings
  has_many :books, -> {distinct}, through: :book_class_member_bindings

  def full_name
    return first_name + ' ' + last_name
  end

  def of_name
    return last_name + ' ' + first_name
  end

  def self.fetch_utu
    response = Net::HTTP.post_form(URI.parse('http://utu.herokuapp.com/api/pre_data'), {})
    hash = Hash.from_xml(response.body)
    ClassMember.destroy_all
    hash['utu']['sclasses']['sclass']['class_members']['class_member'].each do |class_member|
      ClassMember.create({first_name: class_member['first_name'], last_name: class_member['last_name']})
    end
  end
end
