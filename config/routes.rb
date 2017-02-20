Rails.application.routes.draw do

  root to: 'class_members#index'

  resources :class_members
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
