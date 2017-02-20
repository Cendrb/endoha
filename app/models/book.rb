class Book < ApplicationRecord
  has_many :class_members, through: :book_class_member_bindings
  belongs_to :category
end
