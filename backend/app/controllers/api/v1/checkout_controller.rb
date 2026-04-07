require 'stripe'

module Api
  module V1
    class CheckoutController < ApplicationController
      # In a real app, you would have an initializer with your secret key
      # Stripe.api_key = Rails.application.credentials.stripe_secret_key

      def create_payment_intent
        # Stripe.api_key is read from ENV['STRIPE_SECRET_KEY'] or fallback
        Stripe.api_key = ENV['STRIPE_SECRET_KEY'] || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'

        begin
          # For demo, default is 500 cents ($5.00)
          amount = 500

          payment_intent = Stripe::PaymentIntent.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
          })

          render json: {
            paymentIntent: payment_intent.client_secret,
            publishableKey: ENV['STRIPE_PUBLISHABLE_KEY'] || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
          }
        rescue Stripe::StripeError => e
          render json: { error: e.message }, status: 400
        end
      end
    end
  end
end
