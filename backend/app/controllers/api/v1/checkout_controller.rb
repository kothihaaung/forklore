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
          recipe = Recipe.find(params[:recipe_id])
          # Stripe amount is in cents
          amount = (recipe.price * 100).to_i
          
          # For development, use the test user we created in seeds
          user = User.find_by(email: "test@example.com")

          # Create a pending order
          order = Order.create!(
            user: user,
            recipe: recipe,
            status: 'pending'
          )

          payment_intent = Stripe::PaymentIntent.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
              order_id: order.id,
              recipe_id: recipe.id,
              user_id: user.id
            }
          })

          # Update order with payment intent ID
          order.update(stripe_payment_intent_id: payment_intent.id)

          render json: {
            paymentIntent: payment_intent.client_secret,
            paymentIntentId: payment_intent.id,
            publishableKey: ENV['STRIPE_PUBLISHABLE_KEY'] || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
          }
        rescue Stripe::StripeError => e
          render json: { error: e.message }, status: 400
        rescue => e
          render json: { error: e.message }, status: 500
        end
      end

      def create_subscription
        Stripe.api_key = ENV['STRIPE_SECRET_KEY'] || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
        user = User.find_by(email: "test@example.com")

        begin
          # 1. Create or find Stripe Customer
          unless user.stripe_customer_id.present?
            customer = Stripe::Customer.create({
              email: user.email,
              name: "Test User"
            })
            user.update(stripe_customer_id: customer.id)
          end

          # 2. Look for or create a "Pro" price
          # In a real app, you'd use Rails credentials or a constant
          product = Stripe::Product.list({ limit: 1 }).find { |p| p.name == "Forklore Pro" } || Stripe::Product.create({ name: "Forklore Pro" })
          
          price = Stripe::Price.list({ product: product.id, limit: 1 }).first || Stripe::Price.create({
            unit_amount: 999, # $9.99
            currency: 'usd',
            recurring: { interval: 'month' },
            product: product.id,
          })

          # 3. Create the subscription
          subscription = Stripe::Subscription.create({
            customer: user.stripe_customer_id,
            items: [{ price: price.id }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
              user_id: user.id
            }
          })

          render json: {
            subscriptionId: subscription.id,
            paymentIntent: subscription.latest_invoice.payment_intent.client_secret,
            publishableKey: ENV['STRIPE_PUBLISHABLE_KEY'] || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
          }
        rescue Stripe::StripeError => e
          render json: { error: e.message }, status: 400
        rescue => e
          render json: { error: e.message }, status: 500
        end
      end

      def confirm_payment
        order = Order.find_by(stripe_payment_intent_id: params[:payment_intent_id])
        
        if order
          order.update(status: 'paid')
          render json: { success: true, message: "Order ##{order.id} confirmed!" }
        else
          render json: { error: "Order not found" }, status: 404
        end
      end
    end
  end
end
