Rails.application.routes.draw do

  get 'endoha/index'
  post 'endoha/update_binding'

  get 'current_class_member' => 'current_class_member#form'
  post 'current_class_member' => 'current_class_member#set'
  resources :books
  resources :categories
  root to: 'endoha#index'

  resources :class_members
  get 'class_members_fetch' => 'class_members#fetch_utu'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
