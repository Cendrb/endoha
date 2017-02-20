Rails.application.routes.draw do

  get 'current_class_member' => 'current_class_member#form'
  post 'current_class_member' => 'current_class_member#set'
  resources :books
  resources :categories
  root to: 'class_members#index'

  resources :class_members
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
