Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'chat_bot', to: 'chat_bot#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
