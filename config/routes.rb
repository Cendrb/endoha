Rails.application.routes.draw do

  get 'endoha/index'
  post 'endoha/update_binding'

  get 'current_class_member' => 'current_class_member#form'
  post 'current_class_member' => 'current_class_member#set'
  resources :books
  resources :categories do
    collection do
      get 'load_from_csv' => :load_from_csv_form
      post 'load_from_csv' => :load_from_csv
    end
  end

  root to: 'endoha#index'

  resources :class_members

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
