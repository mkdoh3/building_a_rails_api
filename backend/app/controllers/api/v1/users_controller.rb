class Api::V1::UsersController < ApplicationController 
    def index 
        @users = User.all
        render json: @users, only: [:id, :username], include: :tweets
        
    end


end


