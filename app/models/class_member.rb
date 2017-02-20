class ClassMember < ApplicationRecord
  has_many :books, through: :book_class_member_bindings
end
