Rails.application.routes.draw do
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  get 'chat_bot', to: 'chat_bot#index'
  get 'prototype', to: 'prototype#index'

  root to: "chat_bot#index"
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
