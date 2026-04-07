module Api
  module V1
    class AuthController < ApplicationController
      def register
        @user = User.new(user_params)
        if @user.save
          token = Jwt::Token.encode(user_id: @user.id)
          render json: { user: @user.as_json(except: :password_digest), token: token }, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        @user = User.find_by(email: params[:email])
        if @user&.authenticate(params[:password])
          token = Jwt::Token.encode(user_id: @user.id)
          render json: { user: @user.as_json(except: :password_digest), token: token }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      private

      def user_params
        params.permit(:email, :password, :password_confirmation)
      end
    end
  end
end
