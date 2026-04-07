require 'stripe'

module Api
  module V1
    class WebhooksController < ApplicationController
      # Disable CSRF for webhooks
      skip_before_action :verify_authenticity_token if defined?(verify_authenticity_token)

      def create
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        endpoint_secret = ENV['STRIPE_WEBHOOK_SECRET']

        event = nil

        begin
          if endpoint_secret.present?
            event = Stripe::Webhook.construct_event(
              payload, sig_header, endpoint_secret
            )
          else
            # For testing without a secret (NOT recommended for production)
            data = JSON.parse(payload, symbolize_names: true)
            event = Stripe::Event.construct_from(data)
          end
        rescue JSON::ParserError => e
          render json: { error: 'Invalid payload' }, status: 400
          return
        rescue Stripe::SignatureVerificationError
          render json: { error: 'Invalid signature' }, status: 400
          return
        end

        # Handle the event
        case event.type
        when 'payment_intent.succeeded'
          payment_intent = event.data.object
          handle_payment_intent_succeeded(payment_intent)
        when 'customer.subscription.created'
          subscription = event.data.object
          handle_subscription_created(subscription)
        else
          puts "Unhandled event type: #{event.type}"
        end

        render json: { success: true }
      end

      private

      def handle_payment_intent_succeeded(payment_intent)
        # Find the order by the payment intent ID
        order = Order.find_by(stripe_payment_intent_id: payment_intent.id)
        
        if order
          order.update(status: 'paid')
          puts "Order ##{order.id} marked as PAID for User ##{order.user_id}"
        else
          puts "Order not found for PaymentIntent #{payment_intent.id}"
        end
      end

      def handle_subscription_created(subscription)
        # In a real app, you'd find user by stripe_customer_id
        # For now, let's look at metadata if we passed it
        user_id = subscription.metadata.user_id
        user = User.find_by(id: user_id) || User.find_by(email: "test@example.com")
        
        if user
          Subscription.create!(
            user: user,
            stripe_subscription_id: subscription.id,
            status: 'active'
          )
          puts "Subscription ACTIVE for User ##{user.id}"
        end
      end
    end
  end
end
