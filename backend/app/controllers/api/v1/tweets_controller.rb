class Api::V1::TweetsController < ApplicationController
    def create
        @tweet = User.last.tweets.create(tweet_params)
        render json: @tweet
    end

    
    def destroy
        @tweet = Tweet.find_by_id(params[:id])
        @tweet.destroy
        render json: @tweet
    end

    private


    def tweet_params
        params.require(:tweet).permit(:content)
    end
end
