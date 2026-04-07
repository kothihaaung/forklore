Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
      resources :categories, only: [:index]
      post 'checkout/create-payment-intent', to: 'checkout#create_payment_intent'
      post 'checkout/create-subscription', to: 'checkout#create_subscription'
      post 'checkout/confirm-payment', to: 'checkout#confirm_payment'
      post 'webhooks', to: 'webhooks#create'
      post 'auth/login', to: 'auth#login'
      post 'auth/register', to: 'auth#register'
    end
  end
end
