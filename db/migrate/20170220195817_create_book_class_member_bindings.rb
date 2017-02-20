class CreateBookClassMemberBindings < ActiveRecord::Migration[5.0]
  def change
    create_table :book_class_member_bindings do |t|
      t.belongs_to :book
      t.belongs_to :class_member

      t.timestamps
    end
  end
end
