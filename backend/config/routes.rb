Rails.application.routes.draw do
  resources :tests
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :tweets, only: [:create, :destroy]
    end
  end
end

